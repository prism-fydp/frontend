import './App.css';

import { HashRouter, Route, Routes } from 'react-router-dom';

import NavButton from './components/nav_button';
import MarkdownEditor from './pages/editor';
import Home from './pages/home';
import MarkdownReader from './pages/reader';

export default function App() {
  return (
    <HashRouter>
      <div className="nav-buttons">
        <NavButton path="/md-reader" name="Read" />
        <NavButton path="/md-editor" name="Write" />
        <NavButton path="/" name="Home" />
      </div>
      <Routes>
        <Route path="/md-reader" element={MarkdownReader()} />
        <Route path="/md-editor" element={MarkdownEditor()} />
        <Route path="/" element={Home()} />
      </Routes>
    </HashRouter>
  );
}
