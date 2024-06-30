import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import GlobalProviderWrapper from '../components/GlobalProviderWrapper';
import ProtectedRoute from '../components/ProtectedRoute';
import CadastroRelatorio from '../pages/CadastroRelatorio';
import ListaRelatorios from '../pages/ListaRelatorios';
import EditarRelatorio from '../pages/EditarRelatorio';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  { 
    path: "/",
    element: (
      <GlobalProviderWrapper>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </GlobalProviderWrapper>
    ),
    errorElement: (
      <div className="container404">
        <img src="404.svg" alt="" className="img404"/>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: 'cadastro-relatorio',
        element: <CadastroRelatorio />
      },
      {
        path: 'lista-relatorios',
        element: <ListaRelatorios />
      },
      {
        path: 'editar-relatorio',
        element: <EditarRelatorio />
      },
      {
        path: 'perfil',
        element: <Profile />
      },
    ]
  },
  {
    path: "/login",
    element: (
      <GlobalProviderWrapper>
        <Login />
      </GlobalProviderWrapper>
    ),
  }
]);

export default router;

