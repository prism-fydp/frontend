import { Card, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Paths from 'renderer/pages/paths';
import FileSummary from './file_summary';

interface Props {
  fileSummaries: FileSummary[];
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
