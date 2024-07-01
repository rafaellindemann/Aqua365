# Aqua365
Projeto desenvolvido durante o módulo 1 do curso futuroDev, turma ECO.

Este sistema é um MVP e tem como objetivo centralizar as informações de consumo de água do usuário. Após cadastrado e logado o usuário pode registrar o seu consumo mensal de água e acompanhar seu histórico através de números ou graficamente.
Um relatório cadastrado pode ser visualizado, editado ou excluído;
Um usuário cadastrado pode ser visualizado, editado ou excluído (apenas se não tiver nenhum relatório cadastrado);


# Tecnologias
Este é um projeto web, totalmente frontend utilizando ReactJS e as bibliotecas descritas abaixo:

## Bibliotecas utilizadas e suas instalações

React Router DOM
```
npm i react-router-dom
```

Material UI
```
npm install @mui/material @emotion/react @emotion/styled
```

React Hook Form
```
npm install react-hook-form
```

Chart.js e o adaptador React-Chartjs-2
```
npm install chart.js react-chartjs-2
```


# Como executar
Para executar este projeto em sua máquina, você pode clonar o repositório executando:
```
git clone https://github.com/rafaellindemann/Aqua365.git
```

Instalar as dependências com:
```
npm install
```

Executar com:
```
npm run dev
``` 

Abrir no navegador o endereço:porta mostrados ao final do script de execução. O mais comum é estar rodando em:
```
http://localhost:5173/
``` 

# Possíveis melhorias
    - Refatoração para melhor abstração de componentes;
    - Padronização do css e sanitização dos vazamentos;
    - Equipamento embarcado/IoT para leitura em tempo real, fornecendo dados mais relevantes para decisões sobre como diminuir o consumo;
    - Apresentar para o usuário a comparação do seu consumo em relação aos demais usuários;
    - Gamificação para incentivar a maior economia de água;