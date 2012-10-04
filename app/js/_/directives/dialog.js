define(['Console'], function (Console) {
    "use strict";
    Console.group("Entering dialog directive module.");

    var directive = function() {
      return {
        require: '^screen',
        restrict: 'E',
        transclude: true,
        scope: { },
        link: function(scope, element, attrs, screenCtrl) {
          screenCtrl.addDialog(scope,element,attrs);
        },
        template:
          '<div class="dialog" ng-transclude>' +
          '</div>',
        replace: true
      };
    }

    Console.groupEnd();
    return directive;
});
