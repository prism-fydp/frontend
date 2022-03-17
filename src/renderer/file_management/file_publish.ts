// eslint-disable-next-line import/no-unresolved
import Paths from '../pages/paths';
import { DefaultUser } from '../types';
import { getCurrentUser } from '../hooks/user';
import FileManager from './file_manager';

export default async function publish() {
  const fileInfo = FileManager.get(Paths.EDITOR);
  if (!fileInfo) return Promise.reject(new Error('No file to publish'));

  const currentUser = getCurrentUser();
  if (currentUser === DefaultUser) {
    return Promise.reject(new Error('Must be signed in to publish'));
  }

  window.electron.ipcRenderer.send('ipfs:add', fileInfo.info.current);

  return Promise.resolve();
}
