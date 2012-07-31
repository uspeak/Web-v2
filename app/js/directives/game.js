define(['Console','Angular'], function (Console,angular) {
    "use strict";
    Console.group("Entering game directive module.");

    var directive = function($compile) {
      var template = '<div class="game" ng-class="{active:active}" ng-controller="Game-{0}">' + /* ng-controller="prueba" */
          '</div>';
      return {
        require: '^games',
        restrict: 'E',
        scope: true, 
        // link: function(scope, element, attrs, gamesCtrl) {
        //   element.html(template.format('whichonea'));
        //   gamesCtrl.addGame(scope, element, attrs);
        //   scope.isEditMode = true;
        // },
        compile:function (tElement, tAttrs, transclude) {
          var transclude = tElement.contents()
          var new_html = angular.element(template.format(tAttrs['gameId']));
          new_html.append(transclude);
          return function (scope, element, attrs, gamesCtrl) {
              element.replaceWith(new_html)
              $compile(new_html)(scope);
              gamesCtrl.addGame(scope, new_html, attrs);
          }
        },
        replace: true
      };
    }

    Console.groupEnd();
    return directive;
});