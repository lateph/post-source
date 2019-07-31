const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const authResolver = require('./graphql/resolvers/auth')
const fs = require('fs');
require('dotenv').config()
// console.log(process.env)
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

const jwt = require('express-jwt');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const app = express();

app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(methodOverride())

const cors = require('cors')
const upload = require("./upload");
const helmet = require('helmet'); 
const auth = jwt({
    secret: "supergantengbanget",
    credentialsRequired: false
})
const restify = require('express-restify-mongoose')
const router = express.Router()
const Tags = require('./models/tag');
const Types = require('./models/type');
const Users = require('./models/user');
const Sources = require('./models/source');

const prepareFile = (body, field) => {
  if (body[field] && body[field].uri){
    if(!body.tempFiles){
      body.tempFiles = []
    }
    body.tempFiles[field] = {
      ...body[field]
    }
    body[field] = body[field].title
  }
}
const saveFile = (body, field, id) => {
  if (body.tempFiles && body.tempFiles[field] && body.tempFiles[field].uri){
    let base64String = body.tempFiles[field].uri;
    let base64Image = base64String.split(';base64,').pop();
    const filename = `uploads/source/${field}/`+id+body.tempFiles[field].title
    if(fs.existsSync(filename)){
      console.log("file ada")
      fs.unlinkSync(filename)
    }
    else{
      console.log("file tidak ada")
    }
    fs.writeFile(filename, base64Image, {encoding: 'base64'}, function(err) {
        if(err){
          console.log(err)
        }
        else{
          console.log('File created');
        }
    });
  }
}

restify.serve(router, Tags, {totalCountHeader:true, runValidators: true})
restify.serve(router, Types, {totalCountHeader:true, runValidators: true})
restify.serve(router, Sources, {totalCountHeader:true, runValidators: true, preCreate: (req, res, next) => {
  const { body } = req
  req.body.creator = req.user.userId
  prepareFile(body, "thumb")
  prepareFile(body, "file")
  next()
},preUpdate: (req, res, next) => {
  const { body, params } = req
  // console.log('jancok',req)

  prepareFile(body, "thumb")
  prepareFile(body, "file")
  Sources.findById(params.id).then((old) => {
    // console.log("old value", old)
    req._old = {
      ...old._doc
    }
    next()
  })
}, postCreate: (req, res, next) => {
  const { body } = req
  Tags.updateMany({ _id: {$in: req.erm.result.tags }}, {$inc:{ total: 1 }}).exec();
  Types.updateOne({_id: req.erm.result.type}, {$inc:{ total: 1 }}).exec();
  console.log("telek")
  saveFile(body, "thumb", req.erm.result._id)
  saveFile(body, "file", req.erm.result._id)
  next()
},postUpdate: async (req, res, next) => {
  const { body,_old } = req
  console.log(_old)
  await Tags.updateMany({ _id: {$in: _old.tags }}, {$inc:{ total: -1 }}).exec();
  await Types.updateOne({_id: _old.type}, {$inc:{ total: -1 }}).exec();
  await Tags.updateMany({ _id: {$in: req.erm.result.tags }}, {$inc:{ total: 1 }}).exec();
  await Types.updateOne({_id: req.erm.result.type}, {$inc:{ total: 1 }}).exec();
  saveFile(body, "thumb", req.erm.result._id)
  saveFile(body, "file", req.erm.result._id)
  next()
},preDelete: (req, res, next) => {
  const { params } = req
  Sources.findById(params.id).then((old) => {
    // console.log("old value", old)
    req._old = {
      ...old._doc
    }
    next()
  })
},postDelete: async (req, res, next) => {
  const { _old } = req
  console.log(_old)
  await Tags.updateMany({ _id: {$in: _old.tags }}, {$inc:{ total: -1 }}).exec();
  await Types.updateOne({_id: _old.type}, {$inc:{ total: -1 }}).exec();
  next()
}, postRead: (req, res, next) => {
  if(Array.isArray(req.erm.result)){
    req.erm.result  =  req.erm.result.map(e => ({
      ...e,
      thumb: e.thumb ? {
        src: `${process.env.BASE_URL}/thumb/${e._id}${e.thumb}`,
        title: e.thumb
      }  : "",
      file: e.file ? {
        src: `${process.env.BASE_URL}/file/${e.file}`,
        title: e.file
      }  : ""
    }))
  }
  else{
    req.erm.result  = {
      ...req.erm.result,
      thumb: req.erm.result.thumb ? {
        src: `${process.env.BASE_URL}/thumb/${req.erm.result._id}${req.erm.result.thumb}`,
        title: req.erm.result.thumb
      } : "",
      file: req.erm.result.file ? {
        src: `${process.env.BASE_URL}/file/${req.erm.result._id}${req.erm.result.file}`,
        title: req.erm.result.file
      } : ""
    }
  }
  next();
}})
restify.serve(router, Users, {totalCountHeader:true, runValidators: true, postRead: (req, res, next) => {
  // console.log(req.erm.result)
  if(Array.isArray(req.erm.result)){
    req.erm.result  =  req.erm.result.map(e => ({
      ...e,
      password: ''
    }))
  }
  else{
    req.erm.result  = {
      ...req.erm.result,
      password: ''
    }
  }
  next();
}})

app.use(cors({
  exposedHeaders: ['X-Total-Count']
}));
app.use(helmet());
app.use(auth);
app.use(router)

app.post("/login", (req, res, next) => {
  authResolver.login(req.body).then((a) => {
    res.json(a)
  })
  .catch((e) => {
    console.log(e)
    res.statusMessage = e.message
    res.status(400).json({responseText: e.message})
  })
});

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
    process.env.DB
  )
  .then(() => {
    app.listen(8000, '0.0.0.0');    
  })
  .catch(err => {
    console.log(err);
  });
