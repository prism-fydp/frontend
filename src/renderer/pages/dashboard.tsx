import styled from 'styled-components';
import FilePreviews from 'renderer/components/file_previews';
import useWriterFileMetadataList from 'renderer/hooks/essays/useWriterFileMetadataList';
import { FileMetadata } from 'renderer/types';
import { useState } from 'react';
import NavOverlay from '../components/nav_overlay';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  overflow-y: scroll;
`;

const EssaysContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 600;
  color: black;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 32px;
`;

export default function Dashboard() {
  const [fileMetadataList, setFileMetadataList] = useState<Array<FileMetadata>>(
    []
  );
  const { loading } = useWriterFileMetadataList(setFileMetadataList);

  let statusText = null;

  if (loading) {
    statusText = <p>Loading files...</p>;
  } else if (!fileMetadataList.length) {
    statusText = <p>No results</p>;
  }

  return (
    <Container>
      <NavOverlay editorButton searchBar>
        <EssaysContainer>
          <div style={{ width: 500 }}>
            <Title>Essays</Title>
          </div>
          {statusText}
          <FilePreviews
            fileMetadataList={fileMetadataList}
            setFileMetadataList={setFileMetadataList}
          />
        </EssaysContainer>
      </NavOverlay>
    </Container>
  );
}
