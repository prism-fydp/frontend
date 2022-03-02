import './App.css';

import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import NavButton from './components/nav_button';
import MarkdownEditor from './pages/editor';
import Home from './pages/home';
import MarkdownReader from './pages/reader';
import FileProps from './common/FileProps';

export default function App() {
  const [readerData, setReader] = useState<FileProps>({
    data: '',
    filePath: '',
  });
  const [editorData, setEditor] = useState<FileProps>({
    data: '',
    filePath: '',
  });

  window.electron.ipcRenderer.on('open-file', (data) => {
    switch (window.location.hash) {
      case '#/md-reader': {
        setReader(data as FileProps);
        break;
      }
      case '#/md-editor': {
        setEditor(data as FileProps);
        break;
      }
      default: {
        break;
      }
    }
  });

  let i = 0;
  window.electron.ipcRenderer.on('save-file', (data) => {
    if (window.location.hash === '#/md-editor') {
      i += 1;
      console.log(i, data);
      // console.log(editorData.filePath, 'here');
      const filePath =
        typeof data === 'string' && data.length > 0
          ? data
          : editorData.filePath;
      setEditor({ data: editorData.data, filePath });
      // console.log(filePath, editorData.filePath);
      window.electron.ipcRenderer.send('save-file', {
        data: editorData.data,
        filePath,
      });
    }
  });

  const reader = MarkdownReader(readerData);
  const editor = MarkdownEditor(editorData, setEditor);

  return (
    <HashRouter>
      <div className="nav-buttons">
        <NavButton path="/md-reader" name="Read" />
        <NavButton path="/md-editor" name="Write" />
        <NavButton path="/" name="Home" />
      </div>
      <Routes>
        <Route path="/md-reader" element={reader} />
        <Route path="/md-editor" element={editor} />
        <Route path="/" element={Home()} />
      </Routes>
    </HashRouter>
  );
}
