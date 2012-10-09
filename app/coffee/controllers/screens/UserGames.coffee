define ["Console", "Underscore", "jQuery"], (Console, _, $) ->
  "use strict"
  ($scope) ->
    $scope.$parent.gameIndex = 0
    $scope.$parent.prevGame = ->
      $scope.$parent.gameIndex = $scope.$parent.gameIndex-1
    
    $scope.$parent.nextGame = ->
      $scope.$parent.gameIndex = $scope.$parent.gameIndex+1
