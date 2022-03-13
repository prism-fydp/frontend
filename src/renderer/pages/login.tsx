import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { useSetCurrentUser, authenticateUser } from 'renderer/hooks/user';
import { User } from 'renderer/types';
import { useNavigate } from '../hooks/core';
import NavigateButton from '../components/NavigationButton';
import Paths from './paths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return {
        ...state,
        isError: true,
      };
  }
};

const Login = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const onLoginSuccess = (user: User) => {
    setCurrentUser(user);
    console.log('Login success.');
    navigate(Paths.DASHBOARD);
  };
  const onLoginError = () => console.log('Login failure.');
  const handleLogin = () =>
    authenticateUser(
      state.username,
      state.password,
      onLoginSuccess,
      onLoginError
    );
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !state.isButtonDisabled) {
      handleLogin();
    }
  };

  return (
    <>
      <NavigateButton path={-1} label="Back" />
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Log In" />
          <CardContent>
            <div>
              <TextField
                error={state.isError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={(e) =>
                  dispatch({ type: 'setUsername', payload: e.target.value })
                }
                onKeyPress={handleKeyPress}
              />
              <TextField
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={state.helperText}
                onChange={(e) =>
                  dispatch({ type: 'setPassword', payload: e.target.value })
                }
                onKeyPress={handleKeyPress}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={handleLogin}
              disabled={state.isButtonDisabled}
            >
              Log In
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default Login;
