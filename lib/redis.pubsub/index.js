'use strict';

module.exports = function ToBindRedisPubSubMethods(app) {

  app.redispubsub.publish = require('./publish')(app);

};
