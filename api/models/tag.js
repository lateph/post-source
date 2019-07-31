const mongoose = require('mongoose');
const createCachePlugin = require('mongoose-plugin-cache')
var redis = require("redis")
const Schema = mongoose.Schema;

const s = new Schema(
    {
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
    },
    { timestamps: true}
);
// s.plugin(
//   createCachePlugin.default({
//     redis,
//     enable: true,
//     onCacheMiss: (modelName, key) => {
//       console.log(`cache_miss.${modelName}.${key}`)
//     },
//     onDataMiss: (modelName, key) => {
//       console.log(`cache_data_miss.${modelName}.${key}`)
//     },
//   }),
// )
// console.log("jancok",createCachePlugin.default({}))
module.exports = mongoose.model('tags', s);