const authResolver = require('./auth');
const sourcesResolver = require('./source');

const rootResolver = {
  ...authResolver,
  ...sourcesResolver,
};

module.exports = rootResolver;
