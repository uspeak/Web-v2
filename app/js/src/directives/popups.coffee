define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  Console.group "Entering popups directive module."
  Console.groupEnd()
  ->
    restrict: "E"
    transclude: true
    scope: true
    template: """<div class="popups" ng-class="{active:active}" ng-transclude></div>"""
    replace: true
    controller: ($scope, $element) ->
      popups = {}
      $scope.$parent.showPopup = (name) ->
        $scope.active = true
        popups[name].scope.active = true

      $scope.$parent.hidePopup = ->
        $scope.active = false
        popups[name].scope.active = false

      @addPopup = (scope, element, attrs) ->
        name = attrs.popupId
        controller = element.controller()
        Console.info "Registered popup #{name}", scope, attrs, element, controller
        popups[name] =
          scope: scope
          controller: controller
          element: element
          attrs: attrs