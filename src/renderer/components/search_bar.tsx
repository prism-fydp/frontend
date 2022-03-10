import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import FileSummary from './file_summary';

interface Props {
  setFileSummaries: (f: FileSummary[]) => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

async function queryDB(text: string) {
  const query = `
    query Search {
      content(where:
        {_or: [
          {title: {_ilike: "%${text}%"}},
          {user:  {username: {_ilike: "%${text}%"}}}
        ]}
      ) {
        cid
        title
        created_at
        user {
          username
        }
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
      operationName: 'Search',
    }),
  });
}

function SearchBar({ setFileSummaries }: Props) {
  const [text, setText] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      queryDB(text)
        .then((result) => result.json())
        .then(({ data, errors }) =>
          errors ? Promise.reject(errors) : data.content
        )
        .then(setFileSummaries)
        .catch(console.log);
    }
  };

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setText(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={text}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onKeyPress={handleKeyPress}
        onChange={handleTextChange}
      />
    </Search>
  );
}

export default SearchBar;
