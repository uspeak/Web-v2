define(['Console','Angular'], function (Console,angular) {
    "use strict";
    Console.group("Entering gameVariation directive module.");

    var directive = function($compile) {
      return {
        restrict: 'A',
        link:function(scope, element, attr){
          scope.$watch('variation', function(value){
            element.css('display', (attr.gameVariation==scope.variation) ? '' : 'none');
          });
        },
        replace: true
      };
    }
    Console.groupEnd();
    return directive;
});
