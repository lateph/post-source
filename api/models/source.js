const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
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
