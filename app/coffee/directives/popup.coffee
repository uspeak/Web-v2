define ["Console", "Angular"], (Console, angular) ->
  "use strict"
  Console.group "Entering game directive module."
  Console.groupEnd()
  ->
    template: """<div class="popup" ng-class="{active:active}"><a ng-click="hidePopup()" class="popup-close"><i class="icon-remove"></i></a><div ng-transclude></div></div>"""
    require: "^popups"
    transclude: true
    restrict: "E"
    scope: true
    link: (scope, element, attrs, popupsCtrl) ->
      popupsCtrl.addPopup scope, element, attrs

    replace: true
