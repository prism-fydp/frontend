import styled from 'styled-components';
import FilePreviews from 'renderer/components/file_previews';
import useWriterFileMetadata from 'renderer/hooks/essays/useWriterFileMetadata';
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
  const { loading, fileMetadata } = useWriterFileMetadata();

  let statusText = null;

  if (loading) {
    statusText = <p>Loading files...</p>;
  } else if (!fileMetadata.length) {
    statusText = <p>No results</p>;
  }

  return (
    <Container>
      <NavOverlay editorButton searchBar>
        <EssaysContainer>
          {statusText}
          <FilePreviews fileSummaries={fileMetadata} />
        </EssaysContainer>
      </NavOverlay>
    </Container>
  );
}
