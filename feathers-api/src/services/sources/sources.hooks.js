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
      if (context.data.file && context.data.file.uri){
        context.data.fileFile = {
          ...context.data.file
        }
        context.data.file = context.data.file.title
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
    patch: [authenticate('jwt'), function(context) {
      if (context.data.thumb && context.data.thumb.uri){
          context.data.fileThumb = {
            ...context.data.thumb
          }
          context.data.thumb = context.data.thumb.title
      }
      if (context.data.file && context.data.file.uri){
        context.data.fileThumb = {
          ...context.data.file
        }
        context.data.file = context.data.file.title
    }
    }],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [function({ result, app }){
      // console.log(context)
      result.data = result.data.map(e => {
        return {
          ...e,
          thumb: app.get('img_url')+e._id+e.thumb
        }
      })
    }],
    get: [function(context){
      context.result = {
        ...context.result,
        thumb: context.result.thumb ? {
          rawFile: null,
          src: context.app.get('img_url')+context.result._id+context.result.thumb,
          title: context.result.thumb
        } : null,
        file:  context.result.file ? {
          rawFile: null,
          src: context.app.get('file_url')+context.result._id+context.result.file,
          title: context.result.file
        } : null
      }
    }],
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
      if (context.data.fileFile && context.data.fileFile.uri){
        let base64String = context.data.fileFile.uri;
        let base64Image = base64String.split(';base64,').pop();
        fs.writeFile('uploads/source/file/'+context.result._id+context.data.fileFile.title, base64Image, {encoding: 'base64'}, function(err) {
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
    patch: [function(context) {
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
      if (context.data.fileFile && context.data.fileFile.uri){
        let base64String = context.data.fileFile.uri;
        let base64Image = base64String.split(';base64,').pop();
        fs.writeFile('uploads/source/file/'+context.result._id+context.data.fileFile.title, base64Image, {encoding: 'base64'}, function(err) {
            if(err){
              console.log(err)
            }
            else{
              console.log('File created');
            }
        });
      }
    }],
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
