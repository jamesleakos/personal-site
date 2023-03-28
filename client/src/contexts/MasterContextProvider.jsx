import React from 'react';
import AuthContextProvider from './AuthContextProvider.jsx';

const MasterContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>{children}</AuthContextProvider>
  );
};

export default MasterContextProvider;
