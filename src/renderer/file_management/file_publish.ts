import Paths from 'renderer/pages/paths';
import UserManager from 'renderer/user_manager/user_manager';
import FileManager from './file_manager';

export default async function publish() {
  const fileInfo = FileManager.get(Paths.EDITOR);
  if (!fileInfo) return Promise.reject(new Error('No file to publish'));

  if (!UserManager.isValidUser()) {
    return Promise.reject(new Error('Must be signed in to publish'));
  }

  const [username, bio, id] = UserManager.get();
  window.electron.ipcRenderer.send('ipfs:add', fileInfo.info.current);

  return Promise.resolve();
}
