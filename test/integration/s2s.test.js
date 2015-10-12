'use strict';

var expect = require('chai').expect;
var lifecycle = require('../helper/lifecycle.helper');
var sinon = require('sinon');

describe('Integration :: ', function() {

  var server1, server2;

  before(function (done) {
    lifecycle.setup2Servers(function(err, result) {
      if (err) {
        return done(err);
      }
      server1 = result.server1;
      server2 = result.server2;
      done();
    })
  });

  after(function (done) {
    lifecycle.teardown(server1, function () {
      lifecycle.teardown(server2, done);
    })
  });

  it('two servers should be created', function () {
    expect(server1).to.be.ok;
    expect(server2).to.be.ok;
  });

  it('both servers should have redispubsub', function () {
    expect(server1.redispubsub).to.be.ok;
    expect(server1.redispubsub.publish).to.be.a('function');
    expect(server2.redispubsub).to.be.ok;
    expect(server2.redispubsub.publish).to.be.a('function');
  });

  it('emit should send event only to current instance', function (done) {
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();
    server1.redispubsub.once('test', callback1);
    server2.redispubsub.once('test', callback2);
    server1.redispubsub.emit('test', {});
    // 2 seconds should be enought to receive event
    setTimeout(function () {
      expect(callback1.calledOnce).to.be.true;
      expect(callback2.called).to.be.false;
      done();
    }, 2000);
  });

  it('publish should send event to all instances', function (done) {
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();
    server1.redispubsub.once('test', callback1);
    server2.redispubsub.once('test', callback2);
    server1.redispubsub.publish('test', {});
    // 2 seconds should be enought to receive event
    setTimeout(function () {
      expect(callback1.calledOnce).to.be.true;
      expect(callback2.calledOnce).to.be.true;
      done();
    }, 2000);
  });
});
