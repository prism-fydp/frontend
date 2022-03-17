import { gql, useLazyQuery } from '@apollo/client';
import { User } from 'renderer/types';
import { sanitizeUser } from 'renderer/utils/sanitize';

const AUTHENTICATE_USER = gql`
  query authenticate_user($username: String!, $password: String!) {
    user(
      where: { username: { _eq: $username }, password: { _eq: $password } }
    ) {
      username
      id
      bio
      public_address
    }
  }
`;

export default function useAuthenticateUser(
  onCompleted: (user: User) => void,
  onError: () => void
) {
  const complete = (data: any) => {
    if (data.user.length) {
      onCompleted(sanitizeUser(data.user[0]));
    } else {
      onError();
    }
  };
  const [authenticateUser, queryState] = useLazyQuery(AUTHENTICATE_USER, {
    onCompleted: complete,
    onError,
  });
  return (username: string, password: string) =>
    authenticateUser({ variables: { username, password } });
}
