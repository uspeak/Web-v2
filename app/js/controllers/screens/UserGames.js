// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "Underscore", "jQuery"], function(Console, _, $) {
    "use strict";
    return function($scope) {
      $scope.$parent.gameIndex = 0;
      $scope.$parent.prevGame = function() {
        return $scope.$parent.gameIndex = $scope.$parent.gameIndex - 1;
      };
      return $scope.$parent.nextGame = function() {
        return $scope.$parent.gameIndex = $scope.$parent.gameIndex + 1;
      };
    };
  });

}).call(this);
