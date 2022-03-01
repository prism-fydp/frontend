import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MarkdownEditor from './pages/editor';
import Home from './pages/home';
import MarkdownReader from './pages/reader';

// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // console.log(arg);
// });

// window.electron.ipcRenderer.myPing();

const NavButton = (path: string, name: string) => {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(path)}>
      {name}
    </button>
  );
};

export default function App() {
  return (
    <div className="app">
      <div className="nav-buttons">
        {NavButton('/md-reader', 'Read')}
        {NavButton('/md-editor', 'Write')}
        {NavButton('/', 'Home')}
      </div>
      <Routes>
        <Route path="/md-reader" element={MarkdownReader()} />
        <Route path="/md-editor" element={MarkdownEditor()} />
        <Route path="/" element={Home()} />
      </Routes>
    </div>
  );
}
