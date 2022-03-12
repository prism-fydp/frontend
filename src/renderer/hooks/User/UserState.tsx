import React, { createContext, useState, useContext } from 'react';

import { User } from '../../types';

type UserState = {
  userState: Partial<User>;
  setUserState: (user: User) => void;
};

const UserStateContext = createContext({} as UserState);

type Props = {
  children?: React.ReactNode;
};

function Provider({ children }: Props) {
  const [userState, setUserState] = useState({});

  const userStateContext: UserState = {
    userState,
    setUserState,
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
  };
}

function useCurrentUser() {
  const { userState } = useContext(UserStateContext);
  return userState;
}

export { useSetCurrentUser, useCurrentUser };

export default Provider;
