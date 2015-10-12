'use strict';

var _ = require('lodash');
var redis = require('redis');
var RedisPubSubEventEmitter = require('./redis-pubsub-eventemitter');

module.exports = function PrepareConnection(app, cb) {
  cb = cb || _.noop;
  var config = app.config.redispubsub;

  // Initialize
  if (!app.redispubsub) {
    app.redispubsub = new RedisPubSubEventEmitter();
  }

  // Create connections
  app.redispubsub.subClient = redis.createClient(config.connection.options);
  app.redispubsub.pubClient = redis.createClient(config.connection.options);

  app.redispubsub.subClient.on('subscribe', function onSubscribeToChannel(channel, count) {
    // Check and call method
    if (_.isFunction(config.onSubscribe)) {
      config.onSubscribe(channel, count);
    }
    cb(null, {
      channel: channel,
      count: count
    });
  });

  app.redispubsub.subClient.on('message', function(channel, message) {
    try {
      message = JSON.parse(message);
    } catch(e) {}
    // Check and call method
    if (_.isFunction(config.onMessage)) {
      config.onMessage(channel, message);
    }
  });

  app.redispubsub.subClient.on('error', function(channel, error) {
    // Check and call method
    if (_.isFunction(config.onError)) {
      config.onError(channel, error);
    }
  });

  app.redispubsub.subClient.subscribe(config.channel || 'sails');
};
