import { Card, CardHeader } from '@mui/material';
import Paths from 'renderer/pages/paths';
import { FileMetadata } from 'renderer/types';
import { useNavigate } from '../hooks/core';
import FileSummary from './file_summary';

interface Props {
  fileSummaries: FileMetadata[];
}

function FilePreviews({ fileSummaries }: Props) {
  const nav = useNavigate();

  const openPreview = (cid: string) => {
    window.electron.ipcRenderer.send('ipfs:get', cid);
    nav(Paths.READER);
  };

  return (
    <div className="file-preview-wrapper">
      {fileSummaries.map((fileSummary) => (
        <Card
          onClick={() => openPreview(fileSummary.cid)}
          key={fileSummary.cid}
          style={{ width: 500, marginBottom: 32 }}
        >
          <CardHeader
            title={`${fileSummary.title}`}
            subheader={`${fileSummary.user.username} - ${fileSummary.created_at}`}
          />
        </Card>
      ))}
    </div>
  );
}

export default FilePreviews;
