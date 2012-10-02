define ["Console", "Angular"], (Console, angular) ->
  "use strict"
  Console.group "Entering game directive module."
  Console.groupEnd()
  ($compile) ->
    require: "^games"
    restrict: "E"
    scope: true
    # controller: "@gameController"
    compile: (tElement, tAttrs, transclude) ->
      transclude = tElement.contents()
      new_html = angular.element("""<div class="game" ng-class="{active:active}" ng-controller="Game-#{ tAttrs.gameController }"></div>""")
      new_html.append transclude
      (scope, element, attrs, gamesCtrl) ->
        element.replaceWith new_html
        $compile(new_html) scope
        gamesCtrl.addGame scope, new_html, attrs

    replace: true