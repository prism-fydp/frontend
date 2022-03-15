/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from '@apollo/client';
import { FileMetadata } from 'renderer/types';
import { sanitizeFileMetadata } from 'renderer/utils/sanitize';

interface FileMetadataResult {
  loading: boolean;
  error: any;
  fileMetadata: Array<FileMetadata>;
}

export default function useFileMetadataByUserId(
  userId: number,
  skip: boolean
): FileMetadataResult {
  const GET_USER_ESSAYS = gql`
    query get_user_essays($userId: Int!) {
      essay(where: { user: { id: { _eq: $userId } } }) {
        cid
        title
        created_at
        user {
          username
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_USER_ESSAYS, {
    skip,
    variables: { userId },
  });

  return {
    loading,
    error,
    fileMetadata: data ? data.essay.map(sanitizeFileMetadata) : [],
  };
}
