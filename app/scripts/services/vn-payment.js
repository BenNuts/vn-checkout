/**
 * @ngdoc service
 * @name vnCheckoutApp.vnPayment
 * @description
 * # vnPayment
 * Factory in the vnCheckoutApp.
 */

angular.module('VolusionCheckout.services')
		.factory('vnPayment', ['$resource', 'vnCheckout', 'vnPCIaaS', function ($resource, vnCheckout, vnPCIaaS) {

			'use strict';

			var //checkout = vnCheckout.get(),
				DEFAULTS = {
					maskPattern  : '^(\\d+?)\\d{4}$',
					maskCharacter: '*'//,
					//apiBase: window.location.protocol + '//pci.' + window.location.hostname.replace('www.', '')
				},
				apiCall = {
					base  : {
						uri: function () {
							//return checkout.config.PCIaaS.url + '/cards/';
							return '/paymentsv1_4/cards';
						}
					},
					save  : {
						uri   : function () {
							return apiCall.base.uri();
						},
						method: 'POST'
					},
					update: {
						uri   : function (cardId) {
							return apiCall.base.uri() + '/' + cardId.toString();
						},
						method: 'PUT'
					}
				},
				// modifiable fields
				// not sure about the implementation so this may be not needed
				card = {
					cardNumber: '41111111111111111',
					cachedMask: {}
				},
				cardPayload = {
					MerchantId    : '3de067d8d96d407697da4a9559f99681',  //checkout.config.PCIaaS.merchantId,
					CardID        : '',  // Original "HiddenCardID"
					PersistCard   : '',
					CardHolderName: '',
					NumberPart    : '',
					ExpireMonth   : '',
					ExpireYear    : '',
					CVV           : '123',
					CardType      : 'VISA'
				};

			function setCardId(cardId) {
				cardPayload.CardID = cardId;
			}

			function setPersistCard(persist) {
				cardPayload.PersistCard = persist;
			}

			function setCardHolderName(name) {
				cardPayload.CardHolderName = name;
			}

			function setCardNumber(number) {
				card.cardNumber = number;
			}

			function setExpireMonth(month) {
				cardPayload.ExpireMonth = month;
			}

			function setExpireYear(year) {
				cardPayload.ExpireYear = year;
			}

			function setCvv(number) {
				cardPayload.CVV = number;
			}

			function setCardType(type) {
				cardPayload.CardType = type;
			}

			function isEmpty(obj) {
				if (Object.getOwnPropertyNames(obj).length > 0) {
					return false;
				}

				return true;
			}

			// create a mask using the regex, and return an object containing two strings with opposite chars masked
			function getMask(useCache) {
				if (useCache && !isEmpty(card.cachedMask)) {
					return card.cachedMask;
				}
				var value = card.cardNumber,
					re1 = new RegExp(DEFAULTS.maskPattern),
					matches = value.match(re1),
					MaskedValueToDisplay = value,
					MaskedValueToSend = [],
					maskChar = DEFAULTS.maskCharacter,
					tmpMask = '';

				if (matches !== null) {
					for (var i = 1; i < matches.length; i++) {
						//this is the information to MASK!!
						tmpMask = '';
						for (var x = 0; x < matches[i].length; x++) {
							tmpMask += maskChar;
						}
						MaskedValueToDisplay = MaskedValueToDisplay.replace(matches[i], tmpMask);
					}
					for (var j = MaskedValueToDisplay.length - 1; j >= 0; j--) {
						if (MaskedValueToDisplay.charAt(j) === maskChar) {
							MaskedValueToSend.unshift(value.charAt(j));
						} else {
							MaskedValueToSend.unshift(maskChar);
						}
					}

					card.cachedMask = {
						toDisplay: MaskedValueToDisplay,
						toSend   : MaskedValueToSend.join('')
					};

					return card.cachedMask;

				} else {
					return {
						toDisplay: value,
						toSend   : value
					};
				}
			}

			//this function takes a boolean which forces it to build a payload that doesn't include the saved card ID
			// so that we can accurately string compare it with a prior post that may not have contained a saved card ID
			function makePayload() {

				cardPayload.NumberPart = (card.cardNumber.indexOf(DEFAULTS.maskCharacter) === -1) ? getMask(/*useCache*/false).toSend : '';

				return JSON.stringify(cardPayload);
			}

			function process() {
				var payload = makePayload();//,
				//requestUri = (cardPayload.CardID) ? apiCall.update.uri(cardPayload.CardID) : apiCall.save.uri(),
				//requestMethod = (cardPayload.CardID) ? apiCall.update.method : apiCall.save.method;

				//request(requestUri, payload, requestMethod, checkout.config.PCIaaS('merchantId'));

				//_receiver.src = removeTrailingSlash(settings.get('apiBase')) + framePath;

				if (cardPayload.CardID !== '') {
					vnPCIaaS.Card(apiCall.update.uri(cardPayload.CardID), cardPayload.MerchantId)
							.update(payload).$promise
							.then(function (response) {
								console.log(response);
							})
							.catch(function (response) {
								console.log(response);
							});
				} else {
					vnPCIaaS.Card(apiCall.save.uri(), cardPayload.MerchantId)
							.save(payload).$promise
							.then(function (response) {
								console.log(response);
								var idx = 0,
									token = '';

								while (response[idx]) {
									token += response[idx];
									idx++;
								}

								cardPayload.CardID = token;
							})
							.catch(function (response) {
								console.log(response);
							});
				}
			}

			return {
				process          : process,
				setCardId        : setCardId,
				setPersistCard   : setPersistCard,
				setCardHolderName: setCardHolderName,
				setCardNumber    : setCardNumber,
				setCvv           : setCvv,
				setExpireMonth   : setExpireMonth,
				setExpireYear    : setExpireYear,
				setCardType      : setCardType
			};
		}]);
