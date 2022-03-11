import { useReducer, useState } from 'react';

import UserManager from 'renderer/user_manager/user_manager';
import { useNavigate } from 'react-router-dom';
import FileSummary from '../components/file_summary';

import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

async function queryDB() {
  const query = `
  query MyQuery {
    essay(where: {user: {id: {_eq: ${UserManager.get()[2]}}}}) {
        cid
        title
        created_at
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
      operationName: 'MyQuery',
    }),
  });
}

async function queryDB2(cid: string) {
  const query = `
  mutation MyMutation {
    delete_essay(where: {cid: {_eq: "${cid}"}}) {
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
      operationName: 'MyMutation',
    }),
  });
}

// interface Props {
//   fileSummaries: Array<FileSummary>;
// }

function DeleteFiles(fileSummaries: Array<FileSummary>) {
  // const nav = useNavigate();
  const [essays, setEssays] = useState(fileSummaries);
  const [enabled, setEnabled] = useState(false);

  const handleFirstSearch = () => {
    queryDB()
      .then((result) => result.json())
      .then(({ data, errors }) =>
        errors ? Promise.reject(errors) : data.essay
      )
      .then((d) => {
        setEssays(d);
        setEnabled(true);
        console.log(d);
        return d;
      })
      .catch(() => []);
  };

  const remove = (item: FileSummary) => {
    console.log(item);
    const filteredArr = essays.filter((el) => el.cid !== item.cid);
    setEssays(filteredArr);
  };
  return (
    <>
      <div style={{ position: 'absolute', left: 260, top: 32 }}>
        <Typography color="#000000" variant="h3" component="div" align="center">
          Click the essay that you want to delete
        </Typography>
      </div>
      <button
        style={{ position: 'absolute', left: 260, top: 130 }}
        type="button"
        onClick={handleFirstSearch}
      >
        Show me my essays
      </button>
      {/* <p>{essay}</p> */}
      {enabled && (
        <List
          style={{
            position: 'absolute',
            left: 260,
            top: 200,
          }}
          component="nav"
          aria-label="mailbox folders"
        >
          {essays.map((essay) => (
            <div key={essay.cid}>
              <ListItemButton
                style={{
                  // position: 'absolute',
                  // left: 260,
                  // top: 32,
                  color: '#000000',
                }}
                onClick={() => {
                  queryDB2(essay.cid)
                    .then((result) => result.json())
                    .then(({ data, errors }) =>
                      errors ? Promise.reject(errors) : data.delete_essay
                    )
                    .catch(() => []);
                  remove(essay);
                }}
              >
                <ListItemText primary={essay.title} />
              </ListItemButton>
              <Divider />
              {/* <button>Remove</button> <Divider /> */}
            </div>
          ))}
        </List>
      )}
    </>
  );
}

export default DeleteFiles;
