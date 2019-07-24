const tags = require('./tags/tags.service.js');
const users = require('./users/users.service.js');
const types = require('./types/types.service.js');
const sources = require('./sources/sources.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tags);
  app.configure(users);
  app.configure(types);
  app.configure(sources);
};
