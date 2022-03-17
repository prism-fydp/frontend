/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/always-return */
import { DefaultUser, User } from 'renderer/types';
import { gql, useMutation } from '@apollo/client';
import { sanitizeUser } from 'renderer/utils/sanitize';

export default function useCreateUser(
  onCompleted: (user: User) => void
): Array<any> {
  const CREATE_USER = gql`
    mutation insert_single_user($object: user_insert_input!) {
      insert_user_one(object: $object) {
        id
        username
        bio
        created_at
      }
    }
  `;

  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  const createUserWithParams = (
    username: string,
    password: string,
    bio: string
  ) => {
    createUser({
      variables: {
        object: {
          username,
          password,
          bio,
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
