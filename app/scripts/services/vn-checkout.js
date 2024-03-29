/**
 * @ngdoc service
 * @name vnCheckoutApp.vnCheckout
 * @description
 * # vnCheckout
 * Factory in the vnCheckoutApp.
 */

angular.module('VolusionCheckout.services')
	.factory('vnCheckout', function () {

		'use strict';

		var IMAGE_US = 'images/us-flag.png',
			IMAGE_WW = 'images/worldwide-flag.png',

			checkout = {
				location       : {
					label: 'us',
					image: IMAGE_US
				},
				currentStep    : 1,
				steps          : [
					{ 'active': true },
					{ 'active': false },
					{ 'active': false }
				],
				shipToValid    : true,
				billToValid    : false,
				creditCardValid: false
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

		function setStep() {
			// reset steps
			angular.forEach(checkout.steps, function (step) {
				step.active = false;
			});

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

		return {
			get                  : get,
			nextStep             : nextStep,
			prevStep             : prevStep,
			setCreditCardValidity: setCreditCardValidity,
			setBillToValidity    : setBillToValidity,
			setShipToValidity    : setShipToValidity,
			toggleLocation       : toggleLocation
		};
	});
