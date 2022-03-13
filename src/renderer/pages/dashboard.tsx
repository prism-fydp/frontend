import { useState } from 'react';
import { queryById } from 'renderer/utils/query_db';
import FileSummary from 'renderer/components/file_summary';
import FilePreviews from 'renderer/components/file_previews';
import { useCurrentUser } from 'renderer/hooks/User';
import NavOverlay from '../components/nav_overlay';
import UserManager from '../user_manager/user_manager';

export default function Dashboard() {
  const [essays, setEssays] = useState<FileSummary[]>([]);
  const [refresh, setRefresh] = useState(false);
  const currentUser = useCurrentUser();

  const [username, bio, id] = UserManager.get();
  if (refresh) {
    queryById(id as number)
      .then((result) => result.json())
      .then(({ data, errors }) =>
        errors ? Promise.reject(errors) : data.essay
      )
      .then((result) => {
        setEssays(result);
        setRefresh(false);
      })
      .catch(console.log);
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F5F5F5',
        overflowY: 'scroll',
      }}
    >
      <NavOverlay editorButton searchBar onSignOut={() => setEssays([])}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <button
            style={{ width: 150, marginBottom: 32 }}
            type="button"
            onClick={() => setRefresh(true)}
          >
            Get Essays
          </button>
          <p>Hello {currentUser.username}</p>
          <FilePreviews fileSummaries={essays} />
        </div>
      </NavOverlay>
    </div>
  );
}
