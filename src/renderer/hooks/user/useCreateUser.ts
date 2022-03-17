/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/always-return */
import { gql, useMutation } from '@apollo/client';
import { sanitizeUser } from '../../utils/sanitize';
import { DefaultUser, User } from '../../types';

const CREATE_USER = gql`
  mutation insert_single_user($object: user_insert_input!) {
    insert_user_one(object: $object) {
      id
      username
      bio
      public_address
      created_at
    }
  }
`;

export default function useCreateUser(
  onCompleted: (user: User) => void
): Array<any> {
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  const createUserWithParams = (
    username: string,
    password: string,
    bio: string,
    publicAddress: string
  ) => {
    createUser({
      variables: {
        object: {
          username,
          password,
          bio,
          public_address: publicAddress,
        },
      },
      onCompleted,
      onError: console.log,
    });
  };

  return [
    createUserWithParams,
    {
      loading,
      error,
      user: data ? sanitizeUser(data.insert_user_one) : DefaultUser,
    },
  ];
}
