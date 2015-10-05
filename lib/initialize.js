'use strict';

var prepareConnection = require('./prepare-connection');

module.exports = function onInitialize(app) {

  return function initialize(done) {
    prepareConnection(app, function (err, details) {
      if (err) {
        return done(err);
      }
      app.log.verbose('Connected to channel: ' + details.channel);
      done();
    });
    app.once('lower', require('./on-lower')(app));
  };
};
