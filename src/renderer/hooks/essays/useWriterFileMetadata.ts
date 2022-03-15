import { useCurrentUser } from '../user';
import useFileMetadataByUserId from './useFileMetadataByUserId';
import { DefaultUser, FileMetadata } from '../../types';

interface FileMetadataResult {
  loading: boolean;
  error: any;
  fileMetadata: Array<FileMetadata>;
}

export default function useWriterFileMetadata(): FileMetadataResult {
  const currentUser = useCurrentUser();
  const shouldSkip = currentUser.id === DefaultUser.id;
  return useFileMetadataByUserId(currentUser.id, shouldSkip);
}
