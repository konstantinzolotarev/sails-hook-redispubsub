/**
 * Module dependencies
 */

var Sails = require('sails').Sails;
var _ = require('lodash');
var async = require('async');

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
      // dirty port setup.
      port: config.port || TEST_SERVER_PORT,
      log: { level: 'warn' },
      hooks: {
        // Inject the sockets hook in this repo into this Sails app
        redispubsub: require('../..')
      },
      redispubsub: _.defaults({}, _.omit(config, 'port')),
      loadHooks: ['moduleloader', 'userconfig', 'http', 'redispubsub']
    },function (err) {
      if (err) return done(err);

      // Set global sails instance
      global.sails = app;

      return done(err, app);
    });

  },

  teardown: function (instance, done) {
    if (_.isFunction(instance) && !done) {
      done = instance;
      instance = sails;
    }
    instance.lower(done);
  },

  setup2Servers: function(done) {
    var self = this;
    async.parallel({
      server1: function(cb) {
        self.setup({
          port: 1578
        }, cb);
      },
      server2: function(cb) {
        self.setup({
          port: 1579
        }, cb);
      }
    }, done);
  }
};
