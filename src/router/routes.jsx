import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import ListaRelatorios from "../pages/ListaRelatorios";
import CadastroRelatorio from "../pages/CadastroRelatorio";
import GlobalProviderWrapper from '../components/GlobalProviderWrapper';
import ProtectedRoute from '../components/ProtectedRoute';

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
        path: "/cadastro",
        element: <CadastroRelatorio />,
      },
      {
        path: "/lista",
        element: <ListaRelatorios />,
      }
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


// import { createBrowserRouter } from "react-router-dom";

// import Login from "../pages/Login";
// import App from "../App";
// import Dashboard from "../pages/Dashboard";
// import ListaRelatorios from "../pages/ListaRelatorios";
// import CadastroRelatorio from "../pages/CadastroRelatorio";

// const router = createBrowserRouter([
//   { 
//     path: "/",
//     element: <App />,
//     errorElement: <div className="container404">
//         <img src="404.svg" alt="" className="img404"/>
//       </div>,
//     children: [
//       {
//         path: "/",
//         element: <Dashboard />,
//       },
//       {
//         path: "/cadastro",
//         element: <CadastroRelatorio />,
//       },
//       {
//         path: "/lista",
//         element: <ListaRelatorios />,
//       }
//     ]
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   }
// ]);

// export default router;
