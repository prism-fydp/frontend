import query from '../utils/query';

export default function queryEssaysByUserId(
  userId: number,
  onComplete: (essays: any) => void
) {
  console.log(userId);
  const GET_USER_ESSAYS = `
    query MyQuery {
      essay(where: {user: {id: {_eq: ${userId}}}}) {
          cid
          title
          created_at
          user {
            username
          }
      }
    }
  `;

  return query({
    query: GET_USER_ESSAYS,
    variables: {},
    operationName: 'MyQuery',
  })
    .then(({ data, errors }) => (errors ? Promise.reject(errors) : data.essay))
    .then(onComplete)
    .catch(console.error);
}
