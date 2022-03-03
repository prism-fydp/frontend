import './App.css';

import { HashRouter, Route, Routes } from 'react-router-dom';

import NavButton from './components/nav_button';
import MarkdownEditor from './pages/editor';
import Home from './pages/home';
import MarkdownReader from './pages/reader';
import Paths, { currentPath, isCurrentPath } from './pages/paths';
import FileInfo, { isValidFileInfo } from './file_management/file_info';
import FileManager from './file_management/file_manager';

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
      <div className="nav-buttons">
        <NavButton path={Paths.READER} name="Read" />
        <NavButton path={Paths.EDITOR} name="Write" />
        <NavButton path={Paths.HOME} name="Home" />
      </div>
      <Routes>
        <Route path={Paths.READER} element={MarkdownReader()} />
        <Route path={Paths.EDITOR} element={MarkdownEditor()} />
        <Route path={Paths.HOME} element={Home()} />
      </Routes>
    </HashRouter>
  );
}
