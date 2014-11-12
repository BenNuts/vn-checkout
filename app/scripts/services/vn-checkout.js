/**
 * @ngdoc service
 * @name vnCheckoutApp.vnCheckout
 * @description
 * # vnCheckout
 * Factory in the vnCheckoutApp.
 */

angular.module('VolusionCheckout.services')
		.factory('vnCheckout', ['$rootScope', 'vnSiteConfig', 'vnCart', function ($rootScope, vnSiteConfig, vnCart) {

			'use strict';

			var IMAGE_US = 'images/us-flag.png',
				IMAGE_WW = 'images/worldwide-flag.png',

				checkout = {
					config : {

						PCIaaS : {}
					},
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
					shipToValid    : false,
					shipMethodValid: false,
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

			function setShipMethodValidity(bool) {
				checkout.shipMethodValid = bool;
			}

			function setCreditCardValidity(bool) {
				checkout.creditCardValid = bool;
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
						vnCart.set(checkout.cart);
					});

			vnSiteConfig.getConfig().then(function (response) {
				checkout.config = response.data.checkout;
				checkout.config.PCIaaS = response.data.PCIaaS;

				$rootScope.$emit('PCIaaS.updated');
			});

			return {
				get                  : get,
				nextStep             : nextStep,
				prevStep             : prevStep,
				setStep              : setStep,
				setCreditCardValidity: setCreditCardValidity,
				setBillToValidity    : setBillToValidity,
				setShipToValidity    : setShipToValidity,
				setShipMethodValidity: setShipMethodValidity,
				toggleLocation       : toggleLocation
			};
		}]);
