/**
 * @ngdoc service
 * @name vnCheckoutApp.vnCountries
 * @description
 * # vnCountries
 * Constant in the vnCheckoutApp.
 */

angular.module('vnCheckoutApp')
	.constant('vnCountries', {
		countries: [
			{'abbr': 'USA', 'name': 'United States of America'},
			{'abbr': 'BGR', 'name': 'Bulgaria'},
			{'abbr': 'MEX', 'name': 'Mexico'}
		]
	});


