'use strict';

var expect = require('chai').expect;
var RedisPubSub = require('../../lib/redis-pubsub-eventemitter');
var EventEmitter = require('events').EventEmitter;

describe('redis-pubsub-eventemmiter :: ', function() {

  var pubsub;

  before(function() {
    pubsub = new RedisPubSub();
  });

  after(function() {
    pubsub.removeAllListeners();
    pubsub = null;
  });

  it('Should be instanceof EventEmitter', function() {
    expect(pubsub).to.be.an.instanceof(EventEmitter);
  });

  it('Event should be called', function(done) {
    pubsub.once('test', function(data) {
      expect(data).to.be.an('object');
      expect(data).to.have.property('test');
      expect(data.test).to.be.eql(1);
      done();
    });

    pubsub.emit('test', {
      test: 1
    });
  });
});
