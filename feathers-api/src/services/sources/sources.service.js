// Initializes the `sources` service on path `/sources`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sources.model');
const hooks = require('./sources.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sources', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sources');

  service.hooks(hooks);
};
