'use strict';

module.exports = function ToPublish(app) {
  return function publish(message) {
    if (!app.redispubsub.pubClient) {
      console.log('No pub connection');
      return;
    }
    if (_.isObject(message)) {
      message = JSON.stringify(message);
    }
    console.log('Publish to', app.config.redispubsub.channel, message);
    app.redispubsub.pubClient.publish(app.config.redispubsub.channel, message);
  }
}
