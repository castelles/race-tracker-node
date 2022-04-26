# race-tracker-api

Race Tracker é uma aplicação em NodeJS desenvolvida para registro de campeonatos de corrida de automóveis. 
A ideia é que seja a interface de comunicação entre o microcontrolador, que captura os tempos de cada volta na pista, e a aplicação Web, que disponibiliza
esse dado de forma intuitiva para o usuário final.

## Tecnologias utilizadas
 * Javascript
 * Node
 * Yarn 
 * MongoDB
 * Heroku (for production deployment)
 * Postman (for documentation)

## Para executar localmente
 É necessário, inicialmente clonar ou baixar o repositório na sua máquina.
 
### Pré-requisitos 
 Antes de abrir o projeto ou tentar instalar as dependências é necessário ter instalado:
  * [NodeJS] (https://nodejs.org/en/)
  * [MongoDB] (https://www.mongodb.com/try/download/community)
  * [Yarn] (https://edca.com.br/blog/instalando-o-nodejs-e-o-yarn-em-4-passos)

### Configurando o MongoDB
Crie uma pasta acessível para executar o comando de inicialização do serviço de banco de dados. Por convenção, dá-se o nome de 'mongodb-data' à pasta.
Execute o comando 

  `$ 'mongod --dbpath=caminho-da-pasta\mongodb-data`

e deixe executando.

### Inicializando o projeto
Em outro janela de terminal, abra a pasta do projeto via linha de comando e execute

  `$ yarn install`
  
para instalar as dependencias necessárias para a execução do projeto. Depois, crie uma pasta 'config' no diretório do projeto e adicione o arquivo 'dev.env'
para gerenciar as variáveis de ambiente.
Adicione nesse arquivo a variável 
  
  `$ MONGODB_URL=mongodb://127.0.0.1:PORT/race-tracker-api`
  
substituindo PORT pela porta da conexão configurada no MongoDB.

### Executando
Ainda numa janela do terminal aberta no caminho da pasta do projeto, basta executar o comando
  
  `$ yarn dev `
  
e você terá o projeto rodando localmente na sua máquina.
