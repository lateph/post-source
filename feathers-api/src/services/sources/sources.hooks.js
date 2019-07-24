const fs = require('fs');

const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [authenticate('jwt'), function(context) {
      if (context.data.thumb && context.data.thumb.uri){
          context.data.fileThumb = {
            ...context.data.thumb
          }
          context.data.thumb = context.data.thumb.title
      }
    }],
    update: [authenticate('jwt'), function(context) {
      if (context.data.thumb && context.data.thumb.uri){
          context.data.fileThumb = {
            ...context.data.thumb
          }
          context.data.thumb = context.data.thumb.title
      }
    }],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [function(context) {
      if (context.data.fileThumb && context.data.fileThumb.uri){
          let base64String = context.data.fileThumb.uri;
          let base64Image = base64String.split(';base64,').pop();
          fs.writeFile('uploads/source/thumb/'+context.result._id+context.data.fileThumb.title, base64Image, {encoding: 'base64'}, function(err) {
              if(err){
                console.log(err)
              }
              else{
                console.log('File created');
              }
          });
      }
    }],
    update: [function(context) {
      if (context.data.fileThumb && context.data.fileThumb.uri){
          let base64String = context.data.fileThumb.uri;
          let base64Image = base64String.split(';base64,').pop();
          fs.writeFile('uploads/source/thumb/'+context.result._id+context.data.fileThumb.title, base64Image, {encoding: 'base64'}, function(err) {
              if(err){
                console.log(err)
              }
              else{
                console.log('File created');
              }
          });
      }
    }],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
