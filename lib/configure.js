'use strict';

var defaults = require('./defaults');
var _ = require('lodash');

module.exports = function ToConfigure(app) {

  return function configure() {
    app.config.redispubsub = _.defaults(defaults.redispubsub, app.config.redispubsub);

    if (!app.config.redispubsub.connection.uri) {
      app.config.redispubsub.connection.uri = undefined;
    }
    if (!app.config.redispubsub.channel) {
      app.config.redispubsub.channel = 'sails';
    }
  }
};
