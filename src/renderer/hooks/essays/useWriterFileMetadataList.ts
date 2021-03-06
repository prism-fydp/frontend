import { useCurrentUser } from '../user';
import useFileMetadataByUserId from './useFileMetadataByUserId';
import { DefaultUser, FileMetadata } from '../../types';

interface FileMetadataResult {
  loading: boolean;
  error: any;
  fileMetadataList: Array<FileMetadata>;
}

export default function useWriterFileMetadataList(
  setFileMetadataList: (fileMetadataList: Array<FileMetadata>) => void
): FileMetadataResult {
  const currentUser = useCurrentUser();
  const shouldSkip = currentUser.id === DefaultUser.id;
  return useFileMetadataByUserId(
    currentUser.id,
    setFileMetadataList,
    shouldSkip
  );
}
