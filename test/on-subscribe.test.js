'use strict';

var expect = require('chai').expect;
var lifecycle = require('./helper/lifecycle.helper');
var sinon = require('sinon');

describe('onSubscribe method :: ', function() {

  var callback;

  before(function (done) {
    callback = sinon.spy();
    lifecycle.setup({
      onSubscribe: callback
    }, done);
  });

  after(lifecycle.teardown);

  it('onSubscribe should be called', function () {
    expect(callback.calledOnce).to.be.true;
  });
});
