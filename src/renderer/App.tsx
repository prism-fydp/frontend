import './App.css';

import { HashRouter } from 'react-router-dom';

import Paths, { currentPath, isCurrentPath } from './pages/paths';
import FileInfo, { isValidFileInfo } from './file_management/file_info';
import FileManager from './file_management/file_manager';
import AppRoutes from './pages/routes';
import { setIPFS } from '../main/ipfs/ipfs';

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

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
