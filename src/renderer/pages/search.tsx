import { useState } from 'react';
import FilePreviews from 'renderer/components/file_previews';
import FileSummary from 'renderer/components/file_summary';
import SearchBar from 'renderer/components/search_bar';
import TryButton from '../components/try';

export default function Search() {
  const [fileSummaries, setFileSummaries] = useState<FileSummary[]>([]);

  return (
    <div>
      <div style={{ position: 'absolute', top: 32, left: 32 }}>
        <TryButton routepath={-1} buttonText="Back" />
      </div>
      <SearchBar setFileSummaries={setFileSummaries} />
      <div style={{ marginTop: 32 }}>
        <FilePreviews fileSummaries={fileSummaries} />
      </div>
    </div>
  );
}
