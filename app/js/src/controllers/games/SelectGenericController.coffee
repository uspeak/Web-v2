# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","Underscore","build/controllers/games/GameController"], (Console, soundManager, $, _, GameController) ->
  "use strict"

  class SelectGenericController extends GameController
    initScope: ->
      __ = @
      @scope.selectOption = (correct) ->
        correct ?= @option.correct
        if !correct and !@clicked then __.mistake()
        @clicked ?= not __.clickedCorrect
        if correct
          __.nextRound()
        __.clickedCorrect = correct
        
    preloadAudio: (data) ->
      Console.info "Precarga de Audio iniciada"
      _.each data.W, (round) ->
        if round.au
          soundManager.createSound
            url: round.au
            autoLoad: true

    initData: (data) ->
      super data
      @numOptions = (data.W[0].dist?.length or 1)+1
      @maxMistakes = (@numOptions)/2
      @preloadAudio(data)
      @totalRounds = data.W.length

    initDataRound: (data) ->
      options = _.map data.dist, (word) -> {word:word}
      options.push word: data.m, correct:true
      @scope.word = data.w
      @scope.options = _.shuffle options
      @scope.$apply()

    goRound: (round) ->
      super round
      @clickedCorrect = false
      @initDataRound(@data.W[round])

    calcPoints: (errors) -> (@numOptions-errors*2)*25

