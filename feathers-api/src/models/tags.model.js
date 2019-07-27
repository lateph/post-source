// tags-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tags = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
      type: String,
    },
    total: {
        type: Number,
        default: 0
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('tags', tags);
};
