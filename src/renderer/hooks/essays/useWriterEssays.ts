import { useCurrentUser } from '../user';
import queryEssaysByUserId from './queryEssaysByUserId';

export default function useWriterEssays(onComplete: (essays: any) => void) {
  const currentUser = useCurrentUser();
  queryEssaysByUserId(currentUser.id, onComplete);
}
