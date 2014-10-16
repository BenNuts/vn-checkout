angular.module('VolusionCheckout.directives')
/**
 * @ngdoc directive
 * @name VolusionCheckout.directive:vnPopover
 *
 * @description
 * The vnPopover directive displays city's popover.
 *
 * @restrict E
 * */
	.directive('vnPopoverCity', ['$compile', function ($compile) {

		'use strict';

		return {
			restrict   : 'E',
			templateUrl: 'scripts/popover/vn-popover-tpl.html',
			replace    : true,
			link       : function (scope, element) { // jshint ignore:line

				scope.location = 'top-left';
				scope.title='City must:';
				scope.rules = [
					{
						class : '',
						ngclass: 'cityEmpty',
						ngif: '',
						msg: 'Not be <strong>empty</strong>'
					},
					{
						class : '',
						ngclass: 'cityAllowedChars',
						ngif: 'cityDisallowedChars != null',
						msg: 'Not contain <strong>{{ cityDisallowedChars.join("") }}</strong>'
					}
				];

				var ul = angular.element('<ul>');

				angular.forEach(scope.rules, function (rule) {     // jshint ignore:line
					var li = angular.element('<li>');

					if (rule.ngif && rule.ngif !== '') {
						li.attr('ng-if', rule.ngif);
					}

					li.attr('ng-class', rule.ngclass);

					if (rule.class !== '') {
						li.attr('class', rule.class);
					}

					li.html(rule.msg);

					ul.append(li);
				});

				$compile(ul)(scope);
				element.append(ul);

			}
		};
	}]);
