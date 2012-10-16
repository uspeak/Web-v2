# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","Underscore","controllers/games/Game"], (Console, soundManager, $, _, GameController) ->
  "use strict"

  class SelectGenericController extends GameController
    initScope: ->
      __ = @
      @scope.selectOption = (correct) ->
        correct ?= @option.correct
        kill = false
        if !@clicked
          __.clickedWords.push @option.word
        if !correct and !@clicked
          kill = __.makeMistake()
        @clicked ?= not __.clickedCorrect if kill
        __.clickedCorrect = correct
        if correct
          __.markWord @id, @word, true
          __.addPoints(__.roundPoints())
          __.nextRound()

    nextRound: ->
      @addInfo()
      super

    addInfo: ->
      d = @data.W[@round]
      @info[@round] ?= id: d.id, choosen: []
      @info[@round] = _.extend @info[@round] or {},
        ref: if @clickedCorrect then 1 else 2
        mistakes: @roundMistakes()
        choosen: @clickedWords
      Console.info "Added info", @info[@round]

    preloadAudio: (data) ->
      Console.info "Precarga de Audio iniciada"
      _.each data.W, (round) ->
        if round.au
          soundManager.createSound
            url: round.au
            autoLoad: true
            id: round.au

    roundPoints: ->
      mistakes = @roundMistakes()
      (@numOptions-mistakes*2)*25

    initData: (data) ->
      super data
      @numOptions = (data.W[0].dist?.length or 1)+1
      @maxMistakes = (@numOptions)/2
      @preloadAudio(data)
      @totalRounds = data.W.length

    initDataRound: (data) ->
      options = _.map data.dist, (word) -> {word:word}
      options.push word: data.m, correct:true
      @markWord data.id, data.w

      @scope.word = data.w
      @scope.id = data.id
      @scope.options = _.shuffle options
      @scope.$apply()

    goRound: (round) ->
      super round
      @clickedCorrect = false
      @clickedWords = []
      @initDataRound @data.W[round]
