// types-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const types = new Schema({
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false
    },
    total: {
        type: Number,
        default: 0
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('types', types);
};
