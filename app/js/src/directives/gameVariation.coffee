define ["Console", "Angular"], (Console, angular) ->
  "use strict"
  Console.group "Entering gameVariation directive module."
  Console.groupEnd()
  ($compile) ->
    restrict: "A"
    link: (scope, element, attr) ->
      scope.$watch "gameVariation", (value) ->
        element.css "display", (if (parseInt(attr.gameVariation) is scope.gameVariation) then "" else "none")
    replace: true
