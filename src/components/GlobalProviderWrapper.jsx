import React from 'react';
import { GlobalContextProvider } from '../context/GlobalContext';

const GlobalProviderWrapper = ({ children }) => {
  return (
    <GlobalContextProvider >
      {children}
    </GlobalContextProvider>
  );
}

export default GlobalProviderWrapper;
