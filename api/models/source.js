const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  slug: { type: String, slug: "title" , unique: true},
  shortDesc: {
    type: String,
    required: [true, 'Short Desc is required']
  },
  desc: {
    type: String,
    required:  [true, 'Desc is required']
  },
  category: {
    type: String,
    required:  [true, 'Category is required']
  },
  file: {
    type: String,
  },
  thumb: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  type: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:  [true, 'Type is required']
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required:  [false, 'Creator is required']
  },
}, 
{ timestamps: true});

module.exports = mongoose.model('sources', sourceSchema);
