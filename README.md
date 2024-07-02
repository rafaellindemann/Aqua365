# Aqua365
Projeto desenvolvido durante o módulo 1 do curso futuroDev, turma ECO.

Este sistema é um MVP e tem como objetivo centralizar as informações de consumo de água do usuário. Após cadastrado e logado o usuário pode registrar o seu consumo mensal de água e acompanhar seu histórico através de números ou graficamente.

Um relatório cadastrado pode ser visualizado, editado ou excluído. A edição e a exclusão dos relatórios, conforme requisito, estão disponíveis na página 'Lista de Relatórios'.

Os relatórios cadastrados são mostrados em detalhes na página Dashboard onde encontramos um card para cada relatório e um gráfico mostrando a evolução do consumo ao longo do tempo.

O Dashboard também mostra cards com o total de usuários e relatórios cadastrados, além do número de relatórios cadastrados pelo usuário ativo.

Um usuário cadastrado pode ser visualizado na página 'Perfil' e, a partir de lá, editado ou excluído (exclusão disponível apenas se não tiver nenhum relatório cadastrado para ele);

As rotas são protegidas, se o usuário tentar acessar qualquer página sem efetuar o login, será redirecionado para a página de login.

Para facilitar os testes o sistema carrega 11 usuários e 7 relatórios do arquivo dados.json ao iniciar. 
Para testar com um ambiente populado de relatórios, faça login com o usuário:
```
    "email": "1@1",
    "senha": "1",
```

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


# Vídeo (de apenas 5 minutos) apresentando o projeto
[Vídeo do Projeto](https://drive.google.com/file/d/1vzvLAqw-Jx-0LXKZq78c18_oxUBDren1/view?usp=sharing)
 *Melhor visualizado em pelo menos 720p de qualidade e tela cheia.
