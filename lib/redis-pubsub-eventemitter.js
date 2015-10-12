'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function RedisPubSubEventEmitter() {
  // Initialize necessary properties from `EventEmitter` in this instance
  EventEmitter.call(this);
}

// Inherit functions from `EventEmitter`'s prototype
util.inherits(RedisPubSubEventEmitter, EventEmitter);

module.exports = RedisPubSubEventEmitter;
