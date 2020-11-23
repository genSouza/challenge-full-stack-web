# How to run:
*Com Docker:
~/challenge-full-stack-web$ docker-compose up

*Sem Docker:
-backend (diretório raiz: ~/challenge-full-stack-web/backend)

 1. npm install 
 2. npm run build
 3. npm run start:dev

 -frontend: (diretório raiz: ~/challenge-full-stack-web/frontend)

 1. npm install
 2. npm run build
 3. npm run dev
 
OBS: Para rodar sem docker, precisa alterar a configuração do banco de dados. Edite o arquivo "typeorm.config.ts" em "challenge-full-stack-web/backend/src/config" e altere as seguintes configurações:
  host: 'ipdobanco',
  port: suaporta,
  username: 'seu user',
  password: 'seu password',
  database: 'seu banco',
  
  *Para rodar os testes:
  ~/challenge-full-stack-web/backend$  npm run test
  
# Arquitetura utilizada
A arquitetura utilizada no backend  a n-Tier  com 3 camadas , implementadas através de uma api REST. A camada de dados  foi feita utilizando o repository pattern, a camada de serviços que contém as regras de negócio,  e a camada de controllers para prover  o acesso via http  da api. A camada de dados  foi construída com o padrão DTO, para não explicitar dados desnecessários na API, bem como foi adicionado um tipo uuid na construção das entidades para não precisar explicitar as chaves primárias no banco ao se efeutar as operações.
No frontend, o padrão utilizado é MVVM adotado pelo Vue.js 

## Lista de bibliotecas de terceiros utilizadas
*Backend:
  NestJS. Ele utiliza o express como middleware, então acredito  estar dentro do escopo do desafio.
  Typescript: Para tipagem e utilização de recursos providos pela OOP.
  TypeORM: Framework de ORM
  Jest: Para testes 
  
*Frontend:
Nuxt.js. Framework de Vue.js para aplicações SSR.
Vuetify
Axios para request http
Vuex para estado  da aplicação
V-mask para máscara de CPF
*Banco de dados:
PostgreSQL.

Docker / Docker Compose:
Docker para  criação dos containers  que rodam a aplicação e banco de dados. Docker compose para rodar múltiplos  containers. 

## O que você melhoraria se tivesse mais tempo

Validaria o CPF no backend também, bem como no banco de dados via uma trigger before insert. Faria testes de front end, faria autenticação da api via JWT. Hospedaria a aplicação para melhor visualização.


## Quais requisitos obrigatórios que não foram entregues

Todos os requisitos foram entregues.

