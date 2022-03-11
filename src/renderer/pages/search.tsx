import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import FilePreviews from 'renderer/components/file_previews';
import FileSummary from 'renderer/components/file_summary';
import SearchBar from 'renderer/components/search_bar';
import TryButton from '../components/try';

async function queryDB(by: string) {
  const query = `
    query AllBy {
      essay(order_by:
        { ${by} }
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
      operationName: 'AllBy',
    }),
  });
}

export default function Search() {
  const [fileSummaries, setFileSummaries] = useState<FileSummary[]>([]);
  const [ordering, setOrdering] = useState('');

  const handleSelection = (event: SelectChangeEvent) => {
    const selection = event.target.value as string;
    setOrdering(selection);
    if (selection !== '') {
      queryDB(ordering)
        .then((result) => result.json())
        .then(({ data, errors }) =>
          errors ? Promise.reject(errors) : data.essay
        )
        .then(setFileSummaries)
        .catch(console.log);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
      }}
    >
      <div style={{ position: 'absolute', top: 32, left: 16 }}>
        <TryButton routepath={-1} buttonText="Back" />
      </div>
      <div style={{ width: 500, marginTop: 32 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 400 }}>
            <SearchBar setFileSummaries={setFileSummaries} />
          </div>
          <div style={{ width: 100, marginRight: 20 }}>
            <FormControl fullWidth>
              <InputLabel id="search-all">All By:</InputLabel>
              <Select
                labelId="search-all-select"
                value={ordering}
                autoWidth
                onChange={handleSelection}
              >
                <MenuItem value="created_at: asc">
                  Date <ArrowUpward />
                </MenuItem>
                <MenuItem value="created_at: desc">
                  Date <ArrowDownward />
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <FilePreviews fileSummaries={fileSummaries} />
        </div>
      </div>
    </div>
  );
}
