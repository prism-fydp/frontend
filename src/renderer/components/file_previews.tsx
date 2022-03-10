import { Card, CardHeader } from '@mui/material';
import FileSummary from './file_summary';

interface Props {
  fileSummaries: FileSummary[];
}

function FilePreviews({ fileSummaries }: Props) {
  return (
    <div className="file-preview-wrapper">
      {fileSummaries.map((fileSummary) => (
        <Card>
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
