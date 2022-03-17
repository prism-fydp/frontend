import { HashRouter, Switch, Route } from 'react-router-dom';
import MarkdownEditor from '../pages/editor';
import Landing from '../pages/landing';
import Paths from '../pages/paths';
import MarkdownReader from '../pages/reader';
import Signup from '../pages/signup';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Settings from '../pages/settings';
import Search from '../pages/search';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={Paths.LANDING} component={Landing} />
        <Route path={Paths.SIGNUP} component={Signup} />
        <Route path={Paths.LOGIN} component={Login} />
        <Route path={Paths.DASHBOARD} component={Dashboard} />
        <Route path={Paths.SETTINGS} component={Settings} />
        <Route path={Paths.READER} component={MarkdownReader} />
        <Route path={Paths.EDITOR} component={MarkdownEditor} />
        <Route path={Paths.SEARCH} component={Search} />
      </Switch>
    </HashRouter>
  );
}
