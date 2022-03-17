import React, { createContext, useState, useContext } from 'react';

import { DefaultUser, User } from '../../types';

type UserState = {
  userState: User;
  setUserState: (user: User) => void;
  writerState: User;
  setWriterState: (user: User) => void;
};

const UserStateContext = createContext({} as UserState);
let currentUser: User = DefaultUser;

type Props = {
  children?: React.ReactNode;
};

function Provider({ children }: Props) {
  const [userState, setUserState] = useState(DefaultUser);
  const [writerState, setWriterState] = useState(DefaultUser);

  const userStateContext: UserState = {
    userState,
    setUserState,
    writerState,
    setWriterState,
  };

  return (
    <UserStateContext.Provider value={userStateContext}>
      {children}
    </UserStateContext.Provider>
  );
}

Provider.defaultProps = {
  children: [],
};

function useSetCurrentUser() {
  const { setUserState } = useContext(UserStateContext);
  return (user: User) => {
    setUserState(user);
    currentUser = user;
  };
}

function useCurrentUser(): User {
  const { userState } = useContext(UserStateContext);
  return userState;
}

function getCurrentUser(): User {
  return currentUser;
}

function useCurrentWriter(): User {
  const { writerState } = useContext(UserStateContext);
  return writerState;
}

function useSetCurrentWriter() {
  const { setWriterState } = useContext(UserStateContext);
  return setWriterState;
}

export {
  useSetCurrentUser,
  useCurrentUser,
  getCurrentUser,
  useCurrentWriter,
  useSetCurrentWriter,
};

export default Provider;
