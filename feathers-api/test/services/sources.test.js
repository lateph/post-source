const assert = require('assert');
const app = require('../../src/app');

describe('\'sources\' service', () => {
  it('registered the service', () => {
    const service = app.service('sources');

    assert.ok(service, 'Registered the service');
  });
});
