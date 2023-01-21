import React, { useState, createContext } from 'react';

const INITIAL_VALUES = {
  fetchCount: 0,
  setFetchCount: (count) => { },
  loadingUsers: false,
  setLoadingUsers: (load) => { },
  allUsers: [],
  setAllUsers: (users) => { },
  usersModalOpened: false,
  setUsersModalOpened: (v) => { },
  selectedServId: '',
  setSelectedServId: (id) => { },
  selectedUsers: null,
  setSelectedUsers: (servKey) => { },
};

const UsersContext = createContext(INITIAL_VALUES);

export const UsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(INITIAL_VALUES.allUsers);
  const [loadingUsers, setLoadingUsers] = useState(INITIAL_VALUES.loadingUsers);
  const [fetchCount, setFetchCount] = useState(INITIAL_VALUES.fetchCount);
  const [usersModalOpened, setUsersModalOpened] = useState(INITIAL_VALUES.usersModalOpened);
  const [selectedServId, setSelectedServId] = useState(INITIAL_VALUES.selectedServId);
  const [selectedUsers, setSelectedUsers] = useState(INITIAL_VALUES.selectedUsers);

  return (
    <UsersContext.Provider
      value={{
        fetchCount,
        setFetchCount,
        loadingUsers,
        setLoadingUsers,
        allUsers,
        setAllUsers,
        usersModalOpened,
        setUsersModalOpened,
        selectedServId,
        setSelectedServId,
        selectedUsers,
        setSelectedUsers
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
