/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, useEffect } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { useSetCurrentUser, useCreateUser } from '../hooks/user';
import { sanitizeUser } from '../utils/sanitize';
import { useNavigate } from '../hooks/core';
import NavigationButton from '../components/NavigationButton';
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

// state type

type State = {
  username: string;
  password: string;
  confirmpassword: string;
  bio: string;
  publicAddress: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  bio: '',
  publicAddress: '',
  confirmpassword: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setConfirmPassword'; payload: string }
  | { type: 'setBio'; payload: string }
  | { type: 'setPublicAddress'; payload: string }
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
    case 'setConfirmPassword':
      return {
        ...state,
        confirmpassword: action.payload,
      };
    case 'setBio':
      return {
        ...state,
        bio: action.payload,
      };
    case 'setPublicAddress':
      return {
        ...state,
        publicAddress: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
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

function Signup() {
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onComplete = (data: any) => {
    setCurrentUser(sanitizeUser(data.insert_user_one));
    navigate(Paths.DASHBOARD);
  };
  const createUser = useCreateUser(onComplete)[0];
  const handleSignup = () => {
    createUser(state.username, state.password, state.bio, state.publicAddress);
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !state.isButtonDisabled) {
      handleSignup();
    }
  };
  useEffect(() => {
    if (
      state.username.trim() &&
      state.password.trim() &&
      state.username.length >= 5 &&
      state.username.length <= 16 &&
      state.password === state.confirmpassword
    ) {
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
  }, [state.username, state.password, state.confirmpassword]);

  return (
    <>
      <NavigationButton path={-1} label="Back" />
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign up" />
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
              <TextField
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                margin="normal"
                helperText={state.helperText}
                onChange={(e) =>
                  dispatch({
                    type: 'setConfirmPassword',
                    payload: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
              <TextField
                error={state.isError}
                fullWidth
                id="publicAddress"
                type="text"
                label="Public Address"
                placeholder="Enter your public address"
                margin="normal"
                helperText={state.helperText}
                onChange={(e) =>
                  dispatch({
                    type: 'setPublicAddress',
                    payload: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
              <TextField
                error={state.isError}
                fullWidth
                id="bio"
                type="text"
                label="Bio (Optional)"
                placeholder="Enter your bio"
                margin="normal"
                helperText={state.helperText}
                onChange={(e) =>
                  dispatch({ type: 'setBio', payload: e.target.value })
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
              onClick={handleSignup}
              disabled={state.isButtonDisabled}
            >
              Sign up
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default Signup;
