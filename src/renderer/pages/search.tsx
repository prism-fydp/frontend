import { useState } from 'react';
import FilePreviews from 'renderer/components/file_previews';
import FileSummary from 'renderer/components/file_summary';
import SearchBar from 'renderer/components/search_bar';
import TryButton from '../components/try';

export default function Search() {
  const [fileSummaries, setFileSummaries] = useState<FileSummary[]>([]);

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
        <SearchBar setFileSummaries={setFileSummaries} />
        <div style={{ marginTop: 32 }}>
          <FilePreviews fileSummaries={fileSummaries} />
        </div>
      </div>
    </div>
  );
}
