const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const app = express();

app.use(bodyParser.json());

const cors = require('cors')
const helmet = require('helmet'); 
const auth = jwt({
    secret: "supergantengbanget",
    credentialsRequired: false
})

app.use(cors());
app.use(helmet());
app.use(auth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);


mongoose
  .connect(
    `mongodb://localhost:27017/hendra`
  )
  .then(() => {
    app.listen(8000, '0.0.0.0');    
  })
  .catch(err => {
    console.log(err);
  });
