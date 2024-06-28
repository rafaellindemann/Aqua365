
import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [dados, isLoading] = useFetch("/users.json");
  const [usuarios, setUsuarios] = useState([]);
  const [relatorios, setRelatorios] = useState(JSON.parse(
    `[
        {
          "mes": "4/2024",
          "volume": "1500",
          "userID": "1",
          "endereco": "Casa",
          "descricao": "Relatório de água"
        },
        {
          "mes": "5/2024",
          "volume": "1000",
          "userID": "1",
          "endereco": "Casa",
          "descricao": "Relatório de água"
        },
        {
          "mes": "6/2024",
          "volume": "900",
          "userID": "1",
          "endereco": "Casa",
          "descricao": "Relatório de água"
        }
    ]`
  ));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (dados && !isLoading) {
      setUsuarios(dados.usuarios);
    }
  }, [dados, isLoading]);

    function addUsuario(userData) {
    setUsuarios((u) => [...u, userData]);
  }


  return (
    <GlobalContext.Provider value={{ 
      usuarios, 
      setUsuarios, 
      loadingUsuarios: isLoading, 
      relatorios, 
      setRelatorios, 
      isLoggedIn, 
      setIsLoggedIn,
      loggedUser,
      setLoggedUser,
      addUsuario
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
