import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(GlobalContext); // Supondo que você tenha um estado que indique se o usuário está logado

  if (!isLoggedIn) {
    // Se o usuário não está logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se o usuário está logado, renderize o componente filho
  return children;
}

export default ProtectedRoute;
