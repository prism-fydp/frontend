/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from '@apollo/client';
import { FileMetadata } from 'renderer/types';
import { sanitizeFileMetadata } from 'renderer/utils/sanitize';

interface FileMetadataResult {
  loading: boolean;
  error: any;
  fileMetadataList: Array<FileMetadata>;
}

const GET_USER_ESSAYS = gql`
  query get_user_essays($userId: Int!) {
    essay(where: { user: { id: { _eq: $userId } } }) {
      cid
      title
      created_at
      user {
        id
        username
        bio
        public_address
      }
    }
  }
`;

export default function useFileMetadataByUserId(
  userId: number,
  setFileMetadataList: (fileMetadataList: Array<FileMetadata>) => void,
  skip: boolean
): FileMetadataResult {
  const complete = (data: any) => {
    setFileMetadataList(data.essay.map(sanitizeFileMetadata));
  };
  const { loading, error, data } = useQuery(GET_USER_ESSAYS, {
    skip,
    variables: { userId },
    onCompleted: complete,
  });

  return {
    loading,
    error,
    fileMetadataList: data ? data.essay.map(sanitizeFileMetadata) : [],
  };
}
