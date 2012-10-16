define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, $element, user) ->
    exit = ->
      $scope.exitGame()

    $scope.$parent.goGameMenu = ->
      exit()
      $scope.hidePopup()

    $scope.$parent.checkWords = ->
      $scope.showPopup 'postgame-words'

    @onHide = ->
      exit()
