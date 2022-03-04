import { Route, Routes } from 'react-router-dom';
import MarkdownEditor from './editor';
import Home from './home';
import Paths from './paths';
import MarkdownReader from './reader';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.READER} element={MarkdownReader()} />
      <Route path={Paths.EDITOR} element={MarkdownEditor()} />
      <Route path={Paths.HOME} element={Home()} />
    </Routes>
  );
}
