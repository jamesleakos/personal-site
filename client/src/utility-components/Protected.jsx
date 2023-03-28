import React from 'react';
import { Navigate } from 'react-router-dom';
// internal
import AuthContext from '../contexts/AuthContext.js';

function Protected({  children }) {
  const { isLoggedIn } = React.useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to='/sign-in-up' replace />;
  }
  return children;
}
export default Protected;
