/**
 * @ngdoc service
 * @name vnCheckoutApp.vnCheckout
 * @description
 * # vnCheckout
 * Factory in the vnCheckoutApp.
 */

angular.module('VolusionCheckout.services')
		.factory('vnCheckout', ['vnCart', function (vnCart) {

			'use strict';

			var IMAGE_US = 'images/us-flag.png',
				IMAGE_WW = 'images/worldwide-flag.png',

				checkout = {
					location       : {
						label: 'us',
						image: IMAGE_US
					},
					cart           : {},
					currentStep    : 1,
					steps          : [
						{'active': true},
						{'active': false},
						{'active': false}
					],

					/* TODO : set these to false after tests are done. */
					shipToValid    : true,
					billToValid    : true,
					creditCardValid: true
					/***************************************************/
				};

			function toggleLocation() {
				checkout.location.label = (checkout.location.label === 'ww') ? 'us' : 'ww';
				checkout.location.image = (checkout.location.label === 'us') ? IMAGE_US : IMAGE_WW;
			}

			function setBillToValidity(bool) {
				checkout.billToValid = bool;
			}

			function setShipToValidity(bool) {
				checkout.shipToValid = bool;
			}

			function setCreditCardValidity(bool) {
				checkout.creditCardValid = bool;
			}

			function setCart(cart) {
				checkout.cart = cart.data;
			}

			function setStep(num) {
				// reset steps
				angular.forEach(checkout.steps, function (step) {
					step.active = false;
				});

				if (num !== undefined) {
					checkout.currentStep = num;
				}

				checkout.steps[checkout.currentStep - 1].active = true;

			}

			function get() {
				return checkout;
			}

			function nextStep() {
				if (checkout.steps.length > checkout.currentStep) {
					checkout.currentStep++;
					setStep();
				}
			}

			function prevStep() {
				if (1 < checkout.currentStep) {
					checkout.currentStep--;
					setStep();
				}
			}

			vnCart.initWithPromise()
					.then(function (response) {
						checkout.cart = response.data;
					});

			return {
				get                  : get,
				nextStep             : nextStep,
				prevStep             : prevStep,
				setStep              : setStep,
				setCreditCardValidity: setCreditCardValidity,
				setBillToValidity    : setBillToValidity,
				setShipToValidity    : setShipToValidity,
				toggleLocation       : toggleLocation
			};
		}]);
