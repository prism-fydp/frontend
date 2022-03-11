async function queryDB(text: string) {
  const query = `
    query Search {
      essay(where:
        {_or: [
          {title: {_ilike: "%${text}%"}},
          {user:  {username: {_ilike: "%${text}%"}}}
        ]}
      ) {
        cid
        title
        created_at
        user {
          username
        }
      }
    }
  `;

  return fetch('https://uncommon-starling-89.hasura.app/v1/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'x-hasura-admin-secret':
        'hw9KXsdU7EJCfG7WBjcR74U2jxs32VabiXPQiNrQqixmgYUEj40eElubgvWofbSd',
    }),
    body: JSON.stringify({
      query,
      variables: {},
      operationName: 'Search',
    }),
  });
}

export default queryDB;
