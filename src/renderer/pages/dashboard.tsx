import { useState } from 'react';
import styled from 'styled-components';
import FileSummary from 'renderer/components/file_summary';
import FilePreviews from 'renderer/components/file_previews';
import useWriterEssays from 'renderer/hooks/essays/useWriterEssays';
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
  const [essays, setEssays] = useState<FileSummary[]>([]);
  const onComplete = (data) => {
    if (!essays.length) {
      setEssays(data);
    }
  };
  useWriterEssays(onComplete);

  return (
    <Container>
      <NavOverlay editorButton searchBar onSignOut={() => setEssays([])}>
        <EssaysContainer>
          <FilePreviews fileSummaries={essays} />
        </EssaysContainer>
      </NavOverlay>
    </Container>
  );
}
