// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "Angular"], function(Console, angular) {
    "use strict";
    Console.group("Entering game directive module.");
    Console.groupEnd();
    return function() {
      var template;
      template = "<div class=\"popup\" ng-class=\"{active:active}\"></div>";
      return {
        require: "^popups",
        restrict: "E",
        scope: true,
        link: function(scope, element, attrs, popupsCtrl) {
          return popupsCtrl.addPopup(scope, element, attrs);
        },
        replace: true
      };
    };
  });

}).call(this);