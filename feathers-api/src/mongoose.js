const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

module.exports = function (app) {
  mongoose.connect(
    app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
