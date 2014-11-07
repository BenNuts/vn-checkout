'use strict';

describe('Service: vnPayment', function () {

  // load the service's module
  beforeEach(module('vnCheckoutApp'));

  // instantiate service
  var vnPayment;
  beforeEach(inject(function (_vnPayment_) {
    vnPayment = _vnPayment_;
  }));

  it('should do something', function () {
    expect(!!vnPayment).toBe(true);
  });

});
