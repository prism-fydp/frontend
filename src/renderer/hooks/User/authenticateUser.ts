import { User } from 'renderer/types';
import query from '../utils/query';

export default function authenticateUser(
  username: string,
  password: string,
  onComplete: (user: User) => void,
  onError: () => void
) {
  const AUTHENTICATE_USER = `
  query MyQuery {
    user(where: {username: {_eq: "${username}"}, password: {_eq: "${password}"}}) {
      username
      id
      bio
    }
  }
  `;

  return query({
    query: AUTHENTICATE_USER,
    variables: {},
    operationName: 'MyQuery',
  })
    .then(({ data, errors }) => (errors ? Promise.reject(errors) : data))
    .then((data) => {
      // eslint-disable-next-line promise/always-return
      if (data.user.length === 0) {
        onError();
      } else {
        const user: User = {
          id: data.user[0].id,
          username,
          bio: data.user[0].bio,
        };
        onComplete(user);
      }
    });
}
