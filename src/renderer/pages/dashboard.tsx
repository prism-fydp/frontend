import { useState } from 'react';
import styled from 'styled-components';
import FilePreviews from 'renderer/components/file_previews';
import useWriterEssays from 'renderer/hooks/essays/useWriterEssays';
import { FileMetadata } from 'renderer/types';
import NavOverlay from '../components/nav_overlay';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: F5F5F5;
  overflow-y: scroll;
`;

const EssaysContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Dashboard() {
  const [fileMetadataList, setFileMetadataList] = useState<FileMetadata[]>([]);
  const onComplete = (data: Array<FileMetadata>) => {
    if (!fileMetadataList.length) {
      setFileMetadataList(data);
    }
  };
  useWriterEssays(onComplete);

  return (
    <Container>
      <NavOverlay
        editorButton
        searchBar
        onSignOut={() => setFileMetadataList([])}
      >
        <EssaysContainer>
          <FilePreviews fileSummaries={fileMetadataList} />
        </EssaysContainer>
      </NavOverlay>
    </Container>
  );
}
