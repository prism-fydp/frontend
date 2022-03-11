import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import queryDB from 'renderer/utils/query_db';
import FileSummary from 'renderer/components/file_summary';
import FilePreviews from 'renderer/components/file_previews';
import NavOverlay from '../components/nav_overlay';
import UserManager from '../user_manager/user_manager';

const ESSAY1 = `
# This is a pretty interesting title

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus luctus dolor, non rhoncus lacus mollis sed. Ut erat nunc, laoreet ut sagittis eget, convallis quis mauris. Cras auctor magna neque, non blandit lorem viverra eget. Nunc et tempus purus. Nulla blandit accumsan ante, nec suscipit nisl scelerisque at. Fusce vestibulum ipsum non rutrum efficitur. Cras pellentesque, nisi eget ornare condimentum, dui ex dapibus ligula, eget lacinia eros nisi ut eros. Proin blandit egestas diam ut laoreet. Etiam commodo, nibh in finibus aliquet, lectus nibh maximus velit, consectetur volutpat leo erat a eros. Mauris dignissim imperdiet enim non congue.

Etiam sit amet dui tellus. Pellentesque consectetur turpis risus. Cras sit amet iaculis lectus. Suspendisse potenti. Donec imperdiet massa eu orci tincidunt, ac maximus nisl lobortis. In eros nibh, molestie ut vestibulum eu, varius sit amet mi. Maecenas non rhoncus nisi.

Duis volutpat tellus leo, id commodo risus fermentum eu. Curabitur blandit purus non turpis dictum hendrerit. Etiam vehicula condimentum lacus id imperdiet. Vestibulum et nunc sodales, ullamcorper nulla non, tristique sapien. In imperdiet faucibus velit, eu efficitur nisl efficitur vitae. Aenean ut libero vitae justo interdum accumsan interdum fermentum nisl. In id nunc ante. Duis vehicula, metus varius tempor posuere, justo nibh rhoncus dolor, a hendrerit quam lectus at nibh. Etiam dapibus convallis placerat. In iaculis congue odio, dictum auctor risus lacinia vel.
`;

const ESSAY2 = `
# But this title is way more interesting

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus luctus dolor, non rhoncus lacus mollis sed. Ut erat nunc, laoreet ut sagittis eget, convallis quis mauris. Cras auctor magna neque, non blandit lorem viverra eget. Nunc et tempus purus. Nulla blandit accumsan ante, nec suscipit nisl scelerisque at. Fusce vestibulum ipsum non rutrum efficitur. Cras pellentesque, nisi eget ornare condimentum, dui ex dapibus ligula, eget lacinia eros nisi ut eros. Proin blandit egestas diam ut laoreet. Etiam commodo, nibh in finibus aliquet, lectus nibh maximus velit, consectetur volutpat leo erat a eros. Mauris dignissim imperdiet enim non congue.

Etiam sit amet dui tellus. Pellentesque consectetur turpis risus. Cras sit amet iaculis lectus. Suspendisse potenti. Donec imperdiet massa eu orci tincidunt, ac maximus nisl lobortis. In eros nibh, molestie ut vestibulum eu, varius sit amet mi. Maecenas non rhoncus nisi.

Duis volutpat tellus leo, id commodo risus fermentum eu. Curabitur blandit purus non turpis dictum hendrerit. Etiam vehicula condimentum lacus id imperdiet. Vestibulum et nunc sodales, ullamcorper nulla non, tristique sapien. In imperdiet faucibus velit, eu efficitur nisl efficitur vitae. Aenean ut libero vitae justo interdum accumsan interdum fermentum nisl. In id nunc ante. Duis vehicula, metus varius tempor posuere, justo nibh rhoncus dolor, a hendrerit quam lectus at nibh. Etiam dapibus convallis placerat. In iaculis congue odio, dictum auctor risus lacinia vel.
`;

export default function Dashboard() {
  const [essays, setEssays] = useState<FileSummary[]>([]);

  const [username, bio, id]  = UserManager.get();
  if (!essays.length) {
    queryDB(username as string)
      .then((result) => result.json())
      .then(({ data, errors }) =>
        errors ? Promise.reject(errors) : data.essay
      )
      .then(setEssays)
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
      <NavOverlay editorButton searchBar>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }}
        >
          <FilePreviews fileSummaries={essays} />
        </div>
      </NavOverlay>
    </div>
  );
}
