'use strict';

var expect = require('chai').expect;
var lifecycle = require('./helper/lifecycle.helper');
var sinon = require('sinon');

describe('RedisPubSubEventEmmiter :: ', function() {

  var callback;

  before(lifecycle.setup);
  after(lifecycle.teardown);

  it('should handle local events', function (done) {
    sails.redispubsub.once('test', function (message) {
      expect(message).to.be.an('object')
        .and.have.property('test');
      expect(message.test).to.be.eq(1);
      done();
    });

    sails.redispubsub.emit('test', {
      test: 1
    });
  });

  it('should handle global events send with publish', function (done) {
    sails.redispubsub.once('test', function (message) {
      expect(message).to.be.an('object')
        .and.have.property('test');
      expect(message.test).to.be.eq(1);
      done();
    });

    sails.redispubsub.publish('test', {
      test: 1
    });
  });

  it('should handle global events send with publish (raw data)', function (done) {
    sails.redispubsub.once('test', function (message) {
      expect(message).to.be.an('object')
        .and.have.property('test');
      expect(message.test).to.be.eq(1);
      done();
    });

    sails.redispubsub.publish({
      event: 'test',
      test: 1
    });
  });

  it('should automatically create event/data in publish method', function (done) {
    sails.redispubsub.once('test', function (message) {
      expect(message).to.be.an('object')
        .and.have.property('data');
      expect(message.data).to.be.eq('some-data');
      done();
    });

    sails.redispubsub.publish('test', 'some-data');
  });
});
