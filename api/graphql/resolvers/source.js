const Source = require('../../models/source');
const Tag = require('../../models/tag');
const User = require('../../models/user');
const validate = require("validate.js");
const { isAuthenticated } = require('../../helpers/is-auth')

const { transformSource } = require('./merge');

module.exports = {
  sources: async () => {
    try {
      const sources = await Source.find();
      return sources.map(source => {
        return transformSource(source);
      });
    } catch (err) {
      throw err;
    }
  },
  createSource: async (args, req) => {
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
      let up = await Tag.updateMany({ name: {$in: args.input.tags }}, {$inc:{ total: 1 }});
      console.log(up, args.input.tags)
      return {
        source: createdSource
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
