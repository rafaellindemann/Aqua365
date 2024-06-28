import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';

import router from './router/routes.jsx';
import { GlobalContextProvider } from './context/GlobalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <RouterProvider router={router} />
  </GlobalContextProvider>
)




// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { RouterProvider } from 'react-router-dom';

// import router from './router/routes.jsx';


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router}>
//   </RouterProvider>
// )