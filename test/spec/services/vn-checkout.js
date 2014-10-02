'use strict';

describe('Service: vnCheckout', function () {

  // load the service's module
  beforeEach(module('vnCheckoutApp'));

  // instantiate service
  var vnCheckout;
  beforeEach(inject(function (_vnCheckout_) {
    vnCheckout = _vnCheckout_;
  }));

  it('should do something', function () {
    expect(!!vnCheckout).toBe(true);
  });

});
