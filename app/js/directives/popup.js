define(['Console','Angular'], function (Console,angular) {
    "use strict";
    Console.group("Entering game directive module.");

    var directive = function() {
      var template = '<div class="popup" ng-class="{active:active}">' + /* ng-controller="prueba" */
          '</div>';
      return {
        require: '^popups',
        restrict: 'E',
        scope: true, 
        link: function(scope, element, attrs, popupsCtrl) {
          popupsCtrl.addPopup(scope, element, attrs);
        },
        replace: true
      };
    }

    Console.groupEnd();
    return directive;
});
