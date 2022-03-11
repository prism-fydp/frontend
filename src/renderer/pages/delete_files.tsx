import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import UserManager from 'renderer/user_manager/user_manager';
import { useNavigate } from 'react-router-dom';
import Trybutton from '../components/try';
import Paths from './paths';
import { Typography } from '@mui/material';

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
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  bio: '',
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

async function queryDB(username: string, password: string, bio: string) {
  const query = `
  mutation NewUser {
    insert_user_one(object: {bio: "${bio}", password: "${username}", username: "${password}"}) {
      bio
      created_at
      id
      username
    }
  }
  `;

  return fetch('https://uncommon-starling-89.hasura.app/v1/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'x-hasura-admin-secret':
        'hw9KXsdU7EJCfG7WBjcR74U2jxs32VabiXPQiNrQqixmgYUEj40eElubgvWofbSd',
    }),
    body: JSON.stringify({
      query,
      variables: {},
      operationName: 'NewUser',
    }),
  });
}
const Signup = () => {
  <Typography color="#000000" variant="h1" component="div" gutterBottom>
    Delete your essays from the IPFS Cluster
  </Typography>;
  const nav = useNavigate();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (
      state.username.trim() &&
      state.password.trim() &&
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

  const handleSignup = () => {
    queryDB(state.username, state.password, state.bio)
      .then((result) => result.json())
      .then(({ data, errors }) => (errors ? Promise.reject(errors) : data))
      .then(function (data): any {
        UserManager.setUser(state.username, state.bio, data.insert_user_one.id);
        return data;
      })
      .then(console.log)
      .catch(console.log);
    // export default res;
    nav(Paths.DASHBOARD);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !state.isButtonDisabled) {
      handleSignup();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };
  const handleConfirmPasswordChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    dispatch({
      type: 'setConfirmPassword',
      payload: event.target.value,
    });
  };
  const handleBioChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setBio',
      payload: event.target.value,
    });
  };
  return (
    <>
      <Trybutton routepath={Paths.LANDING} buttonText="Back" />
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
                onChange={handleUsernameChange}
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
                onChange={handlePasswordChange}
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
                onChange={handleConfirmPasswordChange}
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
                onChange={handleBioChange}
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
              onClick={handleSignup} // TODO: change to handle signup
              disabled={state.isButtonDisabled}
            >
              Sign up
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default Signup;
