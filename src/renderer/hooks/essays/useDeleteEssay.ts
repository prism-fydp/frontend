import { gql, useMutation } from '@apollo/client';
import { FileMetadata } from 'renderer/types';

const DELETE_ESSAY = gql`
  mutation delete_essay($cid: String!) {
    delete_essay(where: { cid: { _eq: $cid } }) {
      affected_rows
    }
  }
`;

export default function useDeleteEssay() {
  const [deleteUser, mutationState] = useMutation(DELETE_ESSAY);
  const deleteUserWithParams = (fileMetadata: FileMetadata) => {
    deleteUser({
      variables: {
        cid: fileMetadata.cid,
      },
    });
  };

  return deleteUserWithParams;
}
