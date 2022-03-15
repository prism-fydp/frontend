import { Card, CardHeader } from '@mui/material';
import Paths from 'renderer/pages/paths';
import { FileMetadata } from 'renderer/types';
import { useNavigate } from '../hooks/core';

interface Props {
  fileMetadataList: Array<FileMetadata>;
}

function FilePreviews({ fileMetadataList }: Props) {
  const nav = useNavigate();

  const openPreview = (cid: string) => {
    window.electron.ipcRenderer.send('ipfs:get', cid);
    nav(Paths.READER);
  };

  return (
    <div className="file-preview-wrapper">
      {fileMetadataList.map((fileMetadata) => (
        <Card
          onClick={() => openPreview(fileMetadata.cid)}
          key={fileMetadata.cid}
          style={{ width: 500, marginBottom: 32 }}
        >
          <CardHeader
            title={`${fileMetadata.title}`}
            subheader={`${fileMetadata.user.username} - ${fileMetadata.created_at}`}
          />
        </Card>
      ))}
    </div>
  );
}

export default FilePreviews;
