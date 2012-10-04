define ["Console", "Angular"], (Console, angular) ->
  "use strict"
  Console.group "Entering game directive module."
  Console.groupEnd()
  ->
    template = """<div class="popup" ng-class="{active:active}"></div>"""
    require: "^popups"
    restrict: "E"
    scope: true
    link: (scope, element, attrs, popupsCtrl) ->
      popupsCtrl.addPopup scope, element, attrs

    replace: true
