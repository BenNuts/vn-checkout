angular.module('VolusionCheckout.services')
		.factory('vnPCIaaS', ['$resource',
			function ($resource) {
				'use strict';

				function Card(endpoint, merchantId) {

					var headers = {
						'resource'    : 'PCIaaS',
						'Content-Type': 'application/json',
						'Accept'      : 'application/json',
						'MerchantId'  : merchantId
					};

					return $resource(endpoint,
							{},
							{
								'save'  : {
									method         : 'POST',
									withCredentials: true,
									headers        : headers
								},
								'update': {
									method         : 'PUT',
									withCredentials: true,
									headers        : headers
								}
							});
				}

				return {
					Card: Card
				};
			}]);
