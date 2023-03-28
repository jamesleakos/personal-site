// external
import React from 'react';
import axios from 'axios';

// internal
import AuthContext from './AuthContext.js';
import usePersistedState from '../hooks/usePersistedState.js';

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false);

  const logout = () => {
    axios
      .post('/auth/logout')
      .then((res) => {
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
