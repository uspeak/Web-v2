define ["Console", "Angular"], (Console, angular) ->
  "use strict"
  Console.group "Entering gameVariation directive module."
  Console.groupEnd()
  ($compile) ->
    restrict: "A"
    link: (scope, element, attr) ->
      scope.$watch "variation", (value) ->
        element.css "display", (if (attr.gameVariation is scope.variation) then "" else "none")
    replace: true
