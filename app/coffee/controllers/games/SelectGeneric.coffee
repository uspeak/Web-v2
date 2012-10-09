# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","Underscore","controllers/games/Game"], (Console, soundManager, $, _, GameController) ->
  "use strict"

  class SelectGenericController extends GameController
    initScope: ->
      __ = @
      @scope.selectOption = (correct) ->
        correct ?= @option.correct
        continue_ = false
        if !correct and !@clicked
          continue_ = __.mistake()
        @clicked ?= not __.clickedCorrect if continue_
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
            id: round.au

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

