define(['Console','Angular'], function (Console,angular) {
    "use strict";
    Console.group("Entering gameVariation directive module.");

    var directive = function($compile) {
      return {
        restrict: 'A',
        // scope: true, 
        // link: function(scope, element, attrs, gamesCtrl) {
        //   element.html(template.format('whichonea'));
        //   gamesCtrl.addGame(scope, element, attrs);
        //   scope.isEditMode = true;
        // },
        link:function(scope, element, attr){
          scope.$watch(scope.variation, function(value){
            element.css('display', (attr.gameVariation==scope.variation) ? '' : 'none');
          });
        },
        replace: true
      };
    }
    Console.groupEnd();
    return directive;
});
