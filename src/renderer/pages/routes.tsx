import { Route, Routes } from 'react-router-dom';
import MarkdownEditor from './editor';
import Home from './home';
import Paths from './paths';
import MarkdownReader from './reader';
import Signup from './signup';
import Landing from './landing';
import Login from './login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.READER} element={MarkdownReader()} />
      <Route path={Paths.EDITOR} element={MarkdownEditor()} />
      <Route path={Paths.HOME} element={Home()} />
      <Route path={Paths.SIGNUP} element={Signup()} />
      <Route path={Paths.LANDING} element={Landing()} />
      <Route path={Paths.LOGIN} element={Login()} />
    </Routes>
  );
}
