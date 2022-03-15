import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import Paths, { currentPath, isCurrentPath } from '../pages/paths';
import FileInfo, { isValidFileInfo } from '../file_management/file_info';
import FileManager from '../file_management/file_manager';
import Router from './Router';
import publish from '../file_management/file_publish';
import UserManager from '../user_manager/user_manager';
import { UserStateProvider } from '../hooks/user';

const BASE_URL = 'https://uncommon-starling-89.hasura.app/v1/graphql';
const HASURA_ADMIN_SECRET =
  'hw9KXsdU7EJCfG7WBjcR74U2jxs32VabiXPQiNrQqixmgYUEj40eElubgvWofbSd';

const client = new ApolloClient({
  link: new HttpLink({
    uri: BASE_URL,
    credentials: 'include',
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
  }),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
  },
});

/*
 * Create a listener for opening a file
 */
window.electron.ipcRenderer.on('file:open', (fileInfo) => {
  if (isValidFileInfo(fileInfo)) {
    FileManager.set(currentPath(), fileInfo);
  }
});

/*
 * Create a listener for saving a file
 */
window.electron.ipcRenderer.on('file:save', (savePath) => {
  if (isCurrentPath(Paths.EDITOR)) {
    const fileInfo = FileManager.get(Paths.EDITOR);
    if (!fileInfo) return;

    const useSavePath = typeof savePath === 'string' && savePath.length;
    const filePath = useSavePath ? savePath : fileInfo.info.current.filePath;

    const toSave: FileInfo = { ...fileInfo.info.current, filePath };
    FileManager.set(Paths.EDITOR, toSave);
    window.electron.ipcRenderer.send('file:save', toSave);
  }
});

/*
 * Create a listener for updating the path of the current file
 */
window.electron.ipcRenderer.on('file:set-path', (savePath) => {
  if (isCurrentPath(Paths.EDITOR) && typeof savePath === 'string') {
    const fileInfo = FileManager.get(Paths.EDITOR);
    if (!fileInfo) return;

    const toSave: FileInfo = { ...fileInfo.info.current, filePath: savePath };
    FileManager.set(Paths.EDITOR, toSave);
  }
});

window.electron.ipcRenderer.on('ipfs:add', () => {
  if (isCurrentPath(Paths.EDITOR)) {
    publish().catch(console.error);
  }
});

async function addEssay(cid: string, fileInfo: FileInfo) {
  const authorID = UserManager.get()[2];

  const perIdx = fileInfo.filePath.lastIndexOf('.');
  const sepIdx = fileInfo.filePath.lastIndexOf('/') + 1;

  const query = `
    mutation addEssay {
      insert_essay(objects: {
        author: ${authorID},
        cid: "${cid}",
        title: "${fileInfo.filePath.substring(sepIdx, perIdx)}",
      }) {
        affected_rows
      }
    }
  `;

  return fetch('https://uncommon-starling-89.hasura.app/v1/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'x-hasura-admin-secret':
        'hw9KXsdU7EJCfG7WBjcR74U2jxs32VabiXPQiNrQqixmgYUEj40eElubgvWofbSd',
    }),
    body: JSON.stringify({
      query,
      variables: {},
      operationName: 'addEssay',
    }),
  });
}

window.electron.ipcRenderer.on('ipfs:added', (cid) => {
  const fileInfo = FileManager.get(Paths.EDITOR);
  if (fileInfo && typeof cid === 'string' && cid.length) {
    addEssay(cid, fileInfo.info.current)
      .then((result) => result.json())
      .then(({ data, errors }) =>
        errors ? Promise.reject(errors) : data.insert_essay.affected_rows
      )
      .then(console.log)
      .catch(console.error);
  } else {
    alert('Failed to publish. Please try again.');
  }
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <UserStateProvider>
          <Router />
        </UserStateProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
