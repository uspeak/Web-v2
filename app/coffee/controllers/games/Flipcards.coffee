# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","Underscore","controllers/games/Game"], (Console, soundManager, $, _, GameController) ->
  "use strict"

  class FlipcardsController extends GameController
    @maxErrors: 1000
    roundCards = [6, 6, 6, 6, 6]
    matches = {}
    WOT = (obj) -> obj.word or obj.translation

    constructor: ->
      super
      __ = @
      @scope.selectCard = (correct) ->
        return if @card.selected
        @card.selected = true
        @card.correct = `undefined`
        if __.selectedCard
          correct = __.selectedCard.id is @card.id
          Console.info (if correct then "Matched" else "Unmatched"), WOT(__.selectedCard), WOT(@card)
          @card.correct = __.selectedCard.correct = correct
          __.addInfo(@card.id)
          if correct
            matches[@card.id] = true
            __.selectedCard = false
            __.addPoints(50)
          else
            setTimeout (=>
              @card.selected = false
              __.selectedCard.selected = false
              @$apply()
              __.selectedCard = false
            ), 300
          __.nextRound() if _.all(_.values(matches), _.identity)
        else
          __.selectedCard = @card

    addInfo: (id) ->
      d = @data.W[@round]
      d = _.find @info, (W)->
        W.id == id
      r = 
        id: id
        round: roundCards[@round]
        ref: if matches[id] then 1 else 2
      if d
        _.extend d, r
      else
        @info.push(r)
      Console.info "Added info", @info

    preloadAudio: (data) ->
      Console.info "Precarga de Audio iniciada"
      _.each data.W, (round) ->
        soundManager.createSound url:round.au, autoLoad:true if round.au

    initData: (data) ->
      super data
      @totalRounds = data.W.length/6
      # @preloadAudio(data)

    goRound: (round) ->
      super round
      inf = _.reduce roundCards.slice(0,round), ((memo, num) -> memo + num ), 0
      sup = inf+roundCards[round]
      data = @data.W.slice(inf,sup)
      cards = []
      for wt in data
        cards.push word:wt.w, id:wt.id
        if @variation == 2
          cards.push img:wt.m, id:wt.id
        else
          cards.push word:wt.m, id:wt.id
        matches[wt.id] = false
      @scope.cards = _.shuffle cards
      @scope.$apply()

    calcPoints: (errors) -> 0

  #FlipcardsController.$inject = ['$scope','GamesPlayed']
