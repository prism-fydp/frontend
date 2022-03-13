import { useCurrentUser } from '../user';
import queryEssaysByUserId from './queryEssaysByUserId';
import { DefaultUser } from '../../types';

export default function useWriterEssays(onComplete: (essays: any) => void) {
  const currentUser = useCurrentUser();
  if (currentUser.id === DefaultUser.id) return;
  queryEssaysByUserId(currentUser.id, onComplete);
}
