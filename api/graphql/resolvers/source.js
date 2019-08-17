const Source = require('../../models/source');
const Tag = require('../../models/tag');
const Type = require('../../models/type');
const User = require('../../models/user');
const validate = require("validate.js");
const { isAuthenticated } = require('../../helpers/is-auth')

const { transformSource } = require('./merge');

module.exports = {
  sources: async (args) => {
    try {
      let filter = {
        ...args.filter
      }
      if(args.filter.tags){
        if(Array.isArray(args.filter.tags)) {
          filter.tags = {$in: args.filter.tags};
        } else {
          filter.tags = args.filter.tags;
        }
      }
      if(args.filter.q){
        filter.$text = {$search: args.filter.q}
        delete filter.q
      }
      const sources = await Source.find(filter).skip(args.pagination.skip).limit(args.pagination.limit).exec();
      return sources.map(source => {
        return transformSource(source);
      });
    } catch (err) {
      throw err;
    }
  },
  countSources: async (args) => {
    try {
      let filter = {
        ...args.filter
      }
      if(args.filter.tags){
        if(Array.isArray(args.filter.tags)) {
          filter.tags = {$in: args.filter.tags};
        } else {
          filter.tags = args.filter.tags;
        }
      }
      if(args.filter.q){
        filter.$text = {$search: args.filter.q}
        delete filter.q
      }
      return Source.count(filter)
    } catch (err) {
      throw err;
    }
  },
  sourceSlug: async (args, req) => {
    try {
      const source = await Source.findOne({slug:args.slug});
      
      return transformSource(source);
    } catch (err) {
      throw err;
    }
  },
  createSource: async (args, req) => {
    console.log(req)
    if (isAuthenticated(req)) {
      throw new Error('Unauthenticated!');
    }
    const constraints = {
      title: {
        presence: {allowEmpty: false},
      },
      shortDesc: {
        presence: {allowEmpty: false},
      },
      desc: {
        presence: {allowEmpty: false},
      },
      category: {
        presence: {allowEmpty: false},
      },
      type2: {
        presence: {allowEmpty: false},
      }
    };
    console.log(req.user.userId)
    console.log(args.input.type)
    // return
    const errors = validate({
      title: args.input.title,
      shortDesc: args.input.shortDesc,
      desc: args.input.desc,
      category: args.input.category,
      type2: args.input.type,
    }, constraints);
    if(errors){
      console.log("nyantol error", errors)
      if(errors["type2"]){
        errors["type"] = errors["type2"]
      }
      // if(errors[""])
      // console.log("nyantol error", args)
      return {
        errors,
      }
    }
    const source = new Source({
      title: args.input.title,
      shortDesc: args.input.shortDesc,
      desc: args.input.desc,
      category: args.input.category,
      type: args.input.type,
      tags: args.input.tags,
      creator: req.user.userId
    });
    let createdSource;
    try {
      const result = await source.save();
      console.log("save oke")
      createdSource = transformSource(result);
      console.log("transform ok", createdSource)
      await Tag.updateMany({ _id: {$in: args.input.tags }}, {$inc:{ total: 1 }});
      await Type.updateOne({_id: args.input.type}, {$inc:{ total: 1 }});
      return {
        source: createdSource
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
