// sources-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sources = new Schema({
    title: {
      type: String,
      required: true
    },
    slug: { type: String, slug: "title" , unique: true},
    shortDesc: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    file: {
      type: String,
    },
    thumb: {
      type: String,
    },
    tags: [{
      type:  Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    type: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('sources', sources);
};
