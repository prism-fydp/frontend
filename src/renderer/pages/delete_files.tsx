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
import { Divider, Typography } from '@mui/material';
import FileSummary from 'renderer/components/file_summary';
import Trybutton from '../components/try';
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
  username: Array<FileSummary>;
  password: string;
  confirmpassword: string;
  bio: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: [],
  password: '',
  bio: '',
  confirmpassword: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: Array<FileSummary> }
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

async function queryDB() {
  const query = `
  query MyQuery {
    essay(where: {user: {id: {_eq: ${UserManager.get()[2]}}}}) {
        cid
        title
        created_at
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
      operationName: 'MyQuery',
    }),
  });
}
const DeleteFiles = () => {
  const nav = useNavigate();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSignup = () => {
    queryDB()
      .then((result) => result.json())
      .then(({ data, errors }) =>
        errors ? Promise.reject(errors) : data.essay
      )
      .then((d) => {
        dispatch({
          type: 'setUsername',
          payload: d,
        });
        return d;
      })
      // .then(JSON.parse(data))
      .catch(() => []);
    // export default res;
  };

  return (
    <>
      <Typography color="#000000" variant="h1" component="div" gutterBottom>
        Delete your essays from the IPFS Cluster
      </Typography>
      <button onClick={handleSignup}>hi</button>
      {/* <p>{essay}</p> */}
      {state.username.map((essay) => (
        <div key={essay.cid}>
          {essay.title}
          <button>Remove</button>{' '}
          <Divider />
        </div>
      ))}
    </>
  );
};

export default DeleteFiles;

// {
//   "essay": [
//       {
//           "cid": "aldsfjk",
//           "title": "murica",
//           "created_at": "2022-03-10"
//       },
//       {
//           "cid": "QmUaoioqU7bxezBQZkUcgcSyokatMY71sxsALxQmRRrHrj",
//           "title": "Demo",
//           "created_at": "2022-03-10"
//       }
//   ]
// }
