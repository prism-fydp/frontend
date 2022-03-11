import { Route, Routes } from 'react-router-dom';
import MarkdownEditor from './editor';
import Landing from './landing';
import DeleteFiles from './delete_files';
import Paths from './paths';
import MarkdownReader from './reader';
import Signup from './signup';
import Dashboard from './dashboard';
import Login from './login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.READER} element={MarkdownReader()} />
      <Route path={Paths.EDITOR} element={MarkdownEditor()} />
      <Route path={Paths.DASHBOARD} element={Dashboard()} />
      <Route path={Paths.LANDING} element={DeleteFiles()} />
      <Route path={Paths.LOGIN} element={Login()} />
    </Routes>
  );
}
