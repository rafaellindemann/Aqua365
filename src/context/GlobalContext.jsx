import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [dados, isLoading] = useFetch("/users.json");
  const [usuarios, setUsuarios] = useState([]);
  const [relatorios, setRelatorios] = useState(JSON.parse(
    `[
        {
          "id": 1719692774402,
          "mes": "2024-04",
          "volume": "27",
          "userID": 1719693799011,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
          "descricao": "Relatório de água"
        },
        {
          "id": 1719692774426,
          "mes": "2024-05",
          "volume": "25",
          "userID": 1719693799011,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
          "descricao": "Relatório de água"
        },
        {
          "id": 1719692774427,
          "mes": "2024-06",
          "volume": "26",
          "userID": 1719693799011,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
          "descricao": "Relatório de água"
        },
        {
          "id": 1719692774428,
          "mes": "2024-07",
          "volume": "22",
          "userID": 1719693799011,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
          "descricao": "Relatório de água"
        },
        {
          "id": 1719692774429,
          "mes": "2024-08",
          "volume": "19",
          "userID": 1719693799011,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
          "descricao": "Relatório de água"
        },
        {
          "id": 1719692774430,
          "mes": "2024-09",
          "volume": "17",
          "userID": 1719693799011,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
          "descricao": "Relatório de água"
        },
        {
          "id": 1719692774475,
          "mes": "2024-06",
          "volume": "9",
          "userID": 1719693799009,
          "endereco": {
            "cep": "88058-100",
            "logradouro": "Rua Intendente João Nunes Vieira",
            "complemento": "Apartamento 201",
            "unidade": "1011",
            "bairro": "Ingleses do Rio Vermelho",
            "localidade": "Florianópolis",
            "uf": "SC"
          },
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

  function addUsuario(userData) {
    setUsuarios((u) => [...u, userData]);
  }

  function addRelatorio(relatorio) {
    setRelatorios((r) => [...r, relatorio]);
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
      setLoggedUser,
      addRelatorio
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
