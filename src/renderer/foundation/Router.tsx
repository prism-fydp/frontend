import { Route, Routes } from 'react-router-dom';
import MarkdownEditor from '../pages/editor';
import Landing from '../pages/landing';
import Paths from '../pages/paths';
import MarkdownReader from '../pages/reader';
import Signup from '../pages/signup';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Settings from '../pages/settings';
import Search from '../pages/search';
import DeleteFiles from '../pages/delete_files';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.LANDING} element={Landing()} />
      <Route path={Paths.SIGNUP} element={Signup()} />
      <Route path={Paths.LOGIN} element={Login()} />
      <Route path={Paths.DASHBOARD} element={Dashboard()} />
      <Route path={Paths.SETTINGS} element={Settings()} />
      <Route path={Paths.DELETE} element={DeleteFiles([])} />
      <Route path={Paths.READER} element={MarkdownReader()} />
      <Route path={Paths.EDITOR} element={MarkdownEditor()} />
      <Route path={Paths.SEARCH} element={Search()} />
    </Routes>
  );
}
