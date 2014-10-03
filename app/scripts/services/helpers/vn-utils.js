angular.module('VolusionCheckout.services')
	.factory('vnUtils', function () {

		var Utils = {};

		Utils.checkDisallowedCharacters = function (text) {
			return unescape(text).match(/[^\w\s!().?\[\]'"~`\-]+/g);
		};

		return Utils;
	});
