'use strict';

module.exports = function ToConfigure(app) {

  return function configure() {
    if (!app.config.redispubsub.connection.uri) {
      app.config.redispubsub.connection.uri = undefined;
    }

  }
};
