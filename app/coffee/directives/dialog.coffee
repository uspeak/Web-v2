define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering dialog directive module."
  Console.groupEnd()
  ->
    require: "^screen"
    restrict: "E"
    transclude: true
    scope: {}
    link: (scope, element, attrs, screenCtrl) ->
      screenCtrl.addDialog scope, element, attrs

    template: """<div class="dialog" ng-class="{show:show}" ng-transclude></div>"""
    replace: true