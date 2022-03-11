import { Route, Routes } from 'react-router-dom';
import MarkdownEditor from './editor';
import Landing from './landing';
import Paths from './paths';
import MarkdownReader from './reader';
import Signup from './signup';
import Dashboard from './dashboard';
import Login from './login';
import Settings from './settings';
import Search from './search';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.READER} element={MarkdownReader()} />
      <Route path={Paths.EDITOR} element={MarkdownEditor()} />
      <Route path={Paths.DASHBOARD} element={Dashboard()} />
      <Route path={Paths.SIGNUP} element={Signup()} />
      <Route path={Paths.LANDING} element={Landing()} />
      <Route path={Paths.LOGIN} element={Login()} />
      <Route path={Paths.SETTINGS} element={Settings()} />
      <Route path={Paths.SEARCH} element={Search()} />
    </Routes>
  );
}
