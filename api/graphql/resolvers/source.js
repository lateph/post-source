const Source = require('../../models/source');
const User = require('../../models/user');

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
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const source = new Source({
      title: args.sourceInput.title,
      description: args.sourceInput.description,
      price: +args.sourceInput.price,
      date: new Date(args.sourceInput.date),
      creator: req.userId
    });
    let createdSource;
    try {
      const result = await source.save();
      createdSource = transformSource(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdSources.push(source);
      await creator.save();

      return createdSource;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
