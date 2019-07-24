const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

const jwt = require('express-jwt');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors')
const upload = require("./upload");
const helmet = require('helmet'); 
const auth = jwt({
    secret: "supergantengbanget",
    credentialsRequired: false
})

app.use(cors());
app.use(helmet());
app.use(auth);

app.post("/upload", upload);
app.get("/thumb/:id", (req, res) => {
  res.sendFile(__dirname+`/uploads/source/thumb/${req.params.id}`);
});

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
    `mongodb://128.199.155.103:27017/hendra`
  )
  .then(() => {
    app.listen(8000, '0.0.0.0');    
  })
  .catch(err => {
    console.log(err);
  });
