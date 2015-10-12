/**
 * Module dependencies
 */

var Sails = require('sails').Sails;
var _ = require('lodash');


// Use a weird port to avoid tests failing if we
// forget to shut down another Sails app
var TEST_SERVER_PORT = 1577;


/**
 * @type {Object}
 */

module.exports = {

  setup: function (config, done) {
    if (_.isFunction(config) && !done) {
      done = config;
      config = {};
    }
    if (!_.isPlainObject(config)) {
      config = {};
    }
    // New up an instance of Sails and lift it.
    var app = Sails();

    app.lift({
      port: TEST_SERVER_PORT,
      log: { level: 'warn' },
      hooks: {
        // Inject the sockets hook in this repo into this Sails app
        redispubsub: require('../..')
      },
      redispubsub: _.defaults({}, config),
      loadHooks: ['moduleloader', 'userconfig', 'http', 'redispubsub']
    },function (err) {
      if (err) return done(err);

      // Set global sails instance
      global.sails = app;

      return done(err);
    });

  },

  teardown: function (done) {
    sails.lower(done);
  }
};
