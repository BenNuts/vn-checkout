/**
 * @ngdoc directive
 * @name vnCheckoutApp.directive:vnPlaceholder
 * @description
 * # vnPlaceholder
 */
angular.module('VolusionCheckout.directives')
		.directive('vnPlaceholder', function () {

			'use strict';

			return {
				restrict: 'A',
				require : 'ngModel',
				// If using isolated scope when a sibling directive is used events will be fired into orphaned scope
				// (i.e. they will not propagate properly).
				// The real problem here is that this directive modifies DOM outside it's scope.
				//scope: {},
				compile : function (element, attrs) {

					element.parent().append('<label class="placeholder" ng-click="setFocusFor(\'' + attrs.id + '\')"></label>');

					return function (scope, element) {

						function safeApply(scope, fn) {
							return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
						}

						var input = element,
							label = input.closest('div').find('label.placeholder');

						scope.setFocusFor = function (id) {
							angular.element(document.querySelector('#' + id)).focus();
						};

						function adjustInput() {
							safeApply(scope, function () {
								if (input.val() === '') {
									label.removeClass('-selected');

									if (label.html() !== attrs.vnPlaceholder) {
										label.html(attrs.vnPlaceholder);
									}

								} else {
									label.addClass('-selected');

									if (attrs.vnPlaceholderShort && attrs.vnPlaceholderShort.length > 0) {
										label.html(attrs.vnPlaceholderShort);
									}
								}
							});
						}

						//label.html(attrs.vnPlaceholder);
						safeApply(scope, function () {
							setTimeout(function () {
								label.html(attrs.vnPlaceholder);
							}, 0);
						});

						// In case the input have some default value
						scope.$watch('attrs.ngModel', function () {
							adjustInput();
						});

						input
							.on('keyup', function () {
								adjustInput();
							})
							.on('blur', function () {
								if (input.val() === '') {
									label.removeClass('-selected');

									if (label.html() !== attrs.vnPlaceholder) {
										label.html(attrs.vnPlaceholder);
									}
								}
							});
					};
				}
			};
		});
