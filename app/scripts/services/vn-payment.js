/**
 * @ngdoc service
 * @name vnCheckoutApp.vnPayment
 * @description
 * # vnPayment
 * Factory in the vnCheckoutApp.
 */

angular.module('VolusionCheckout.services')
		.factory('vnPayment', ['$rootScope', '$resource', '$timeout', 'vnCheckout', 'vnPCIaaS', 'ENV',
			function ($rootScope, $resource, $timeout, vnCheckout, vnPCIaaS, ENV) {

				'use strict';

				var checkout = vnCheckout.get(),
					DEFAULTS = {
						maskPattern  : '^(\\d+?)\\d{4}$',
						maskCharacter: '*'
					},
					apiCall = {
						base  : {
							uri: function () {
								//refer local path - will use modrewrite
								return '/paymentsv1_4/cards/';
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
								return apiCall.base.uri() + cardId.toString();
							},
							method: 'PUT'
						}
					},
					cardInfo = {
						cardNumber: '',
						mask      : {},

						MerchantId    : '',
						CardID        : '',  // Original "HiddenCardID"
						PersistCard   : '',
						CardHolderName: '',
						ExpireMonth   : '',
						ExpireYear    : '',
						CVV           : '',
						CardType      : ''
					};

				$rootScope.$on('PCIaaS.updated', function () {
					cardInfo.MerchantId = (ENV.MerchantId !== '') ? ENV.MerchantId : checkout.config.PCIaaS.merchantId;
				});

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

				function maskCardInfo() {
					cardInfo.CVV = cardInfo.CVV.replace(/./g, DEFAULTS.maskCharacter);
					cardInfo.cardNumber = cardInfo.mask.display;
					cardInfo.mask.sent = '';
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
					var payload = makePayload();

					if (cardInfo.CardID !== '') {
						vnPCIaaS.Card(apiCall.update.uri(cardInfo.CardID), cardInfo.MerchantId)
								.update(payload).$promise
								.then(function (response) {  // jshint ignore:line
									maskCardInfo();
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
									maskCardInfo();
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
