define([
    'Console'       // lib/console/console
    , 'jQuery'      // lib/jquery/jquery
], function (Console, $) {
	"use strict";
	Console.group("Entering popups directive module.");

	var directive = function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: true,
        template:
          '<div class="popups" ng-class="{active:active}" ng-transclude>' +
          '</div>',
        replace: true,
        controller: function($scope, $element) {
          var popups = {};
          $scope.$parent.showPopup = function(name) {
            $scope.active = true;
            popups[name].scope.active = true;
          }
          $scope.$parent.hidePopup = function() {
            $scope.active = false;
            popups[name].scope.active = false;
          }
          this.addPopup = function (scope, element, attrs) {
            var name = attrs.popupId;
            var controller = element.controller();
            Console.info("Registered popup {0}".format(name),scope,attrs,element, controller);

            popups[name] = {
              scope:scope,
              controller:controller,
              element:element,
              attrs:attrs,
            };
          }
        },
      };
    }

	Console.groupEnd();
	return directive;
});
