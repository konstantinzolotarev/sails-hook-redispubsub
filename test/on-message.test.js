'use strict';

var expect = require('chai').expect;
var lifecycle = require('./helper/lifecycle.helper');
var sinon = require('sinon');

describe('onMessage method :: ', function() {

  after(lifecycle.teardown);

  it('publish should call onMessage', function (done) {
    lifecycle.setup({
      onMessage: function(channel, message) {
        expect(channel).to.be.eq(sails.config.redispubsub.channel);
        expect(message).to.be.an('object')
          .and.to.have.property('event');
        expect(message.event).to.be.eq('test');
        done();
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
      sails.redispubsub.publish({
        event: 'test'
      });
    });
  });
});
