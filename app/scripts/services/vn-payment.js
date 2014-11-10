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
					cardInfo = {
						cardNumber	  : '41111111111111111',
						mask		  : {},

						MerchantId    : '3de067d8d96d407697da4a9559f99681',  //checkout.config.PCIaaS.merchantId,
						CardID        : '',  // Original "HiddenCardID"
						PersistCard   : '',
						CardHolderName: '',
						ExpireMonth   : '',
						ExpireYear    : '',
						CVV           : '123',
						CardType      : 'VISA'
					};

			function getCard() {
				return cardInfo;
			}

			function setCardId(cardId) {
				cardInfo.CardID = cardId;
			}

			function setPersistCard(persist) {
				cardInfo.PersistCard = persist;
			}

			function setCardHolderName(name) {
				cardInfo.CardHolderName = name;
			}

			function setCardNumber(number) {
				cardInfo.cardNumber = number;
			}

			function setExpireMonth(month) {
				cardInfo.ExpireMonth = month;
			}

			function setExpireYear(year) {
				cardInfo.ExpireYear = year;
			}

			function setCvv(number) {
				cardInfo.CVV = number;
			}

			function setCardType(type) {
				cardInfo.CardType = type;
			}

			function isEmpty(obj) {
				if (Object.getOwnPropertyNames(obj).length > 0) {
					return false;
				}

				return true;
			}

			// create a mask using the regex, and return an object containing two strings with opposite chars masked
			function getMask(useCache) {
				if (useCache && !isEmpty(cardInfo.mask)) {
					return cardInfo.mask;
				}
				var value = cardInfo.cardNumber,
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

					cardInfo.mask = {
						display: MaskedValueToDisplay,
						sent   : MaskedValueToSend.join('')
					};

					return cardInfo.mask;

				} else {
					return {
						display: value,
						sent   : value
					};
				}
			}

			//this function takes a boolean which forces it to build a payload that doesn't include the saved card ID
			// so that we can accurately string compare it with a prior post that may not have contained a saved card ID
			function makePayload() {

				var cardPayload = {};

				cardPayload.NumberPart = (cardInfo.cardNumber.indexOf(DEFAULTS.maskCharacter) === -1) ? getMask(/*useCache*/false).sent : cardInfo.cardNumber;
				cardPayload.CVV = cardInfo.CVV;
				cardPayload.CardType = cardInfo.CardType;

				return JSON.stringify(cardPayload);
			}

			function process() {
				var payload = makePayload();//,
				//requestUri = (cardPayload.CardID) ? apiCall.update.uri(cardPayload.CardID) : apiCall.save.uri(),
				//requestMethod = (cardPayload.CardID) ? apiCall.update.method : apiCall.save.method;

				//request(requestUri, payload, requestMethod, checkout.config.PCIaaS('merchantId'));

				//_receiver.src = removeTrailingSlash(settings.get('apiBase')) + framePath;

				if (cardInfo.CardID !== '') {
					vnPCIaaS.Card(apiCall.update.uri(cardInfo.CardID), cardInfo.MerchantId)
							.update(payload).$promise
							.then(function (response) {
								console.log(response);
							})
							.catch(function (response) {
								console.log(response);
							});
				} else {
					vnPCIaaS.Card(apiCall.save.uri(), cardInfo.MerchantId)
							.save(payload).$promise
							.then(function (response) {
								console.log(response);
								var idx = 0,
									token = '';

								while (response[idx]) {
									token += response[idx];
									idx++;
								}

								cardInfo.CardID = token;
								cardInfo.cardNumber = cardInfo.mask.display;
								cardInfo.mask.sent = '';
							})
							.catch(function (response) {
								console.log(response);
							});
				}
			}

			return {
				getCard          : getCard,
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
