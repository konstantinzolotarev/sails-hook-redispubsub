'use strict';

module.exports = function ToLower(app) {

  return function onLower() {
    if (app.redispubsub && app.redispubsub.subClient) {
      app.redispubsub.subClient.unsubscribe();
      app.redispubsub.subClient.end();
    }
    if (app.redispubsub && app.redispubsub.pubClient) {
      app.redispubsub.pubClient.end();
    }
  };
};
