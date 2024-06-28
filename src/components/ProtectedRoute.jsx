import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(GlobalContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
