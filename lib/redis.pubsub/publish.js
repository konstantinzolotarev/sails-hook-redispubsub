'use strict';

var _ = require('lodash');

module.exports = function ToPublish(app) {
  return function publish(event, message) {
    if (!app.redispubsub.pubClient) {
      console.log('No pub connection');
      return;
    }
    if (_.isObject(event) && !message) {
      message = event;
      event = null;
    }
    if (message && !_.isObject(message)) {
      message = {
        data: message
      };
    }
    if (_.isString(event)) {
      if (!message) {
        message = {};
      }
      message.event = event;
    }
    if (_.isObject(message)) {
      message = JSON.stringify(message);
    }
    app.redispubsub.pubClient.publish(app.config.redispubsub.channel, message);
  }
}
