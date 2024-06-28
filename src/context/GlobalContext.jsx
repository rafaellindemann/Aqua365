/* eslint-disable react/prop-types */
/**
 * PASSOS PARA CRIAR UM CONTEXTO
 *
 * 1 - [x] - IMPORTE O createContext DO REACT
 * 2 - [x] - CRIAR A VARIÁVEL DO CONTEXTO
 * 3 - [x] - EXPORTAR A VARIÁVEL DO CONTEXTO
 *
 * 4 - [x] - CRIE A VARIÁVEL DO PROVIDER
 * 5 - [x] - RECEBA A PROP CHILDREN
 * 6 - [x] - DEFINA OS DADOS GLOBAIS
 * 7 - [x] - CRIE O JSX DO PROVIDER E PASSE OS DADOS GLOBAIS NA PROP value
 * 8 - [x] - IMPORTE O PROVIDER NO ARQUIVO APP.JSX
 *
 * 9 - [] - IMPORTE O CONTEXTO NO ARQUIVO QUE FOR UTILIZAR
 * 10 - [] - IMPORTE O useContext DO REACT
 * 11 - [] - RECEBA OS DADOS GLOBAIS USANDO O useContext
 */

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
    if (!!dados && !isLoading) {
      setUsuarios(dados.usuarios);
    }
  }, [dados]);

  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]);

  function addUsuario(userData) {
    setUsuarios((u) => [...u, userData]);
  }

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
      setLoggedUser 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};


