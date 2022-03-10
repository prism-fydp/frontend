import { useState } from 'react';
import FilePreviews from 'renderer/components/file_previews';
import FileSummary from 'renderer/components/file_summary';
import SearchBar from 'renderer/components/search_bar';

export default function Search() {
  const [fileSummaries, setFileSummaries] = useState<FileSummary[]>([]);

  return (
    <div>
      <SearchBar setFileSummaries={setFileSummaries} />
      <FilePreviews fileSummaries={fileSummaries} />
    </div>
  );
}
