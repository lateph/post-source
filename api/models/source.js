const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
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
  tags: [{
    type: String,
  }],
  type: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, 
{ timestamps: true});

module.exports = mongoose.model('Source', sourceSchema);
