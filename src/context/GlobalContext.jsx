import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [dados, isLoading] = useFetch("/dados.json");
  const [usuarios, setUsuarios] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (!!dados && !isLoading) {
      setUsuarios(dados.usuarios);
      setRelatorios(dados.relatorios);
    }
  }, [dados]);

  function addUsuario(userData) {
    setUsuarios((u) => [...u, userData]);
  }

  function addRelatorio(relatorio) {
    setRelatorios((r) => [...r, relatorio]);
  }

  const updateUser = (updatedUser) => {
    setUsuarios(usuarios.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setLoggedUser(updatedUser);
  };

  return (
    <GlobalContext.Provider value={{ 
      usuarios, 
      setUsuarios, 
      loadingUsuarios: isLoading, 
      addUsuario, 
      relatorios, 
      setRelatorios, 
      isLoggedIn, 
      setIsLoggedIn,
      loggedUser,
      setLoggedUser,
      addRelatorio,
      updateUser
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
