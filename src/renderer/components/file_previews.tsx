/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components';
import Paths from '../pages/paths';
import { FileMetadata } from '../types';
import { useSetCurrentWriter } from '../hooks/user';
import useDeleteEssay from '../hooks/essays/useDeleteEssay';
import { useNavigate } from '../hooks/core';
import DropdownMenu from './DropdownMenu';

import defaultProfile from '../../../assets/default_avatar.png';

const Container = styled.div`
  width: 500px;
  position: relative;
`;

const ContentContainer = styled.div`
  cursor: pointer;
  padding: 32px;
`;

const AuthorDetailsContainer = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
`;

const ProfileAvatar = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: black;
  margin-right: 8px;
`;

const Separator = styled.div`
  background-color: #757575;
  height: 3px;
  width: 3px;
  margin-right: 4px;
  margin-left: 4px;
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin: 0px;
`;

const Divider = styled.div`
  background-color: rgba(210, 210, 210);
  height: 1px;
  width: 100%;
`;

interface Props {
  fileMetadataList: Array<FileMetadata>;
  setFileMetadataList: (fileMetadataList: Array<FileMetadata>) => void;
  showDelete?: boolean;
}

function FilePreviews({
  fileMetadataList,
  setFileMetadataList,
  showDelete,
}: Props) {
  const navigate = useNavigate();
  const deleteEssay = useDeleteEssay();
  const setCurrentWriter = useSetCurrentWriter();
  const openPreview = (fileMetadata: FileMetadata) => {
    window.electron.ipcRenderer.send('ipfs:get', fileMetadata.cid);
    setCurrentWriter(fileMetadata.user);
    navigate(Paths.READER);
  };

  return (
    <div>
      {fileMetadataList.map((fileMetadata, i) => {
        const onDelete = () => {
          console.log(`Deleting essay with name: ${fileMetadata.title}`);
          // Delete it from IPFS
          deleteEssay(fileMetadata);
          // Delete it from local state
          const filteredFileMetadataList = fileMetadataList.filter(
            (e) => e.cid !== fileMetadata.cid
          );
          setFileMetadataList(filteredFileMetadataList);
        };
        const options = [{ name: 'Delete', onClick: onDelete }];

        return (
          <Container key={`fileMetadata-${fileMetadata.cid}`}>
            <ContentContainer onClick={() => openPreview(fileMetadata)}>
              <AuthorDetailsContainer>
                <img
                  style={{ marginRight: 8 }}
                  width="24px"
                  alt="default_profile"
                  src={defaultProfile}
                />
                <p>{fileMetadata.user.username}</p>
                <Separator />
                <p>{fileMetadata.created_at}</p>
              </AuthorDetailsContainer>
              <Title>{fileMetadata.title}</Title>
            </ContentContainer>
            {showDelete && <DropdownMenu options={options} />}
            {i < fileMetadataList.length - 1 && <Divider />}
          </Container>
        );
      })}
    </div>
  );
}

FilePreviews.defaultProps = {
  showDelete: false,
};

export default FilePreviews;
