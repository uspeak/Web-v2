# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","controllers/games/SelectGeneric"], (Console, soundManager, $, SelectGenericController) ->
  "use strict"

  class YayornayController extends SelectGenericController
    @maxMistakes: 1
    initScope: ->
      __ = @
      @scope.selectOption = (option) ->
        correct = option == @correct
        if !correct and !@clicked[option] then __.mistake()
        @clicked[option] ?= not __.clickedCorrect
        if correct
          __.nextRound()
        __.clickedCorrect = correct

    initDataRound: (data) ->
      @scope.word = data.w
      @scope.correct = data.m
      @scope.clicked = {}
      @scope.$apply()
      # @playAudio
      