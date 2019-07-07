const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const s = new Schema(
    {
      name: {
          type: String,
          required: true
      },
      total: {
          type: Number,
          default: 0
      },
    },
    { timestamps: true}
);

module.exports = mongoose.model('Tag', s);