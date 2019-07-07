const authResolver = require('./auth');
const sourcesResolver = require('./source');
const typesResolver = require('./type');
const tagsResolver = require('./tag');

const rootResolver = {
  ...authResolver,
  ...sourcesResolver,
  ...typesResolver,
  ...tagsResolver,
};

module.exports = rootResolver;
