import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Trybutton from '../components/try';

const DEFAULT_LABEL = 'IPFS Max Storage Amount (GB)';
const ERROR_LABEL = 'You must enter a valid number';

export default function SettingsPage() {
  const [error, setError] = useState(false);
  const [label, setLabel] = useState(DEFAULT_LABEL);
  const [ipfsStorageMax, setIpfsStorageMax] = useState('');
  const updateIpfsStorageMax = () => {
    if (ipfsStorageMax !== '') {
      setLabel(DEFAULT_LABEL);
      setError(false);
      window.electron.ipcRenderer.send('ipfs:setting-update', {
        settingKey: 'IPFS:DataStore:StorageMax',
        updatedValue: `${ipfsStorageMax}GB`,
      });
    } else {
      setLabel(ERROR_LABEL);
      setError(true);
    }
  };

  const handler = (event: any) => setIpfsStorageMax(event.target.value);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 400,
          margin: 16,
        }}
      >
        <div style={{ position: 'absolute', left: 32, top: 32 }}>
          <Trybutton routepath={-1} buttonText="Back" />
        </div>
        <div style={{ width: '100%', marginRight: 16 }}>
          <TextField
            label={label}
            error={error}
            variant="filled"
            type="number"
            onChange={handler}
            value={ipfsStorageMax}
            fullWidth
          />
        </div>
        <button type="button" onClick={updateIpfsStorageMax}>
          Save
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: 400,
          margin: 16,
        }}
      >
        <button
          style={{
            backgroundColor: '#F85149',
            color: 'white',
            marginRight: '16px',
          }}
          type="button"
          onClick={() => window.electron.ipcRenderer.send('ipfs:delete-node')}
        >
          Delete Local IPFS Node
        </button>
        <button
          type="button"
          onClick={() => window.electron.ipcRenderer.send('ipfs:restore-node')}
        >
          Re-Connect to IPFS Cluster
        </button>
      </div>
    </>
  );
}
