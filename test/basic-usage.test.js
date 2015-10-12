'use strict';

var expect = require('chai').expect;
var EventEmitter = require('events').EventEmitter;
var lifecycle = require('./helper/lifecycle.helper');

describe('Sails.js should be up and running :: ', function() {

  before(lifecycle.setup);
  after(lifecycle.teardown);

  it('should not fail', function (done) {
    done();
  });

  it('sails should be registered globally', function () {
    expect(sails).to.be.an('object');
  });

  it('hook should be loaded', function () {
    expect(sails.hooks.redispubsub).to.be.ok;
    expect(sails.redispubsub).to.be.an.instanceof(EventEmitter);
  });

  it('hook should contain pub and sub clients', function () {
    expect(sails.redispubsub).to.have.property('subClient');
    expect(sails.redispubsub).to.have.property('pubClient');
  });

  it('hook should have publish method', function () {
    expect(sails.redispubsub).to.have.property('publish');
    expect(sails.redispubsub.publish).to.be.an('function');
  })

});
