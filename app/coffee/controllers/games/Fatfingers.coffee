# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","Underscore","controllers/games/Game"], (Console, soundManager, $, _, GameController) ->
  "use strict"

  class FatfingersController extends GameController
    @maxMistakes: 2
    accentTable = 
      222:
        97: 225
        101: 233
        105: 237
        111: 243
        117: 250

    placeholderSelector: '#game-fatfingers-placeholder'
    lettersSelector: '#game-fatfingers-letters'

    constructor: ->
      super
      lastKey = null

      selectLetter = (e) =>
        return if not e.length or e.is('.completed')

        @typedWord += e.text()
        lis = $ "#{ @placeholderSelector } li:not(.completed)"

        li = lis.eq(0)
        
        if correct = li.text() == e.text()
          e_offset = e.offset()
          p_offset = li.offset()
          li.addClass 'completed'
          e.addClass 'completed'
          e.find('b').css
            top: p_offset.top - e_offset.top + 4
            left: p_offset.left - e_offset.left + 4
          if lis.length==1
            @addPoints(@roundPoints())
            @nextRound()
            return
        else
          @makeMistake()
          e.keyframe 'incorrect', 400

      @scope.$root.clickLetter = (e) ->
        selectLetter $(e.currentTarget)
      
      $(document)
        .keyup( (e) ->
          return if not @scope?.active
          lastKey = e.keyCode or e.charCode
        )
        .keypress( (e) =>
          return if not @scope?.active
          charcode = e.charCode
          if lastKey in accentTable then charcode = accentTable[lastKey][charcode]
          ch = String.fromCharCode charcode
          Console.info "Pressed key #{ ch }"
          elem = $("#{ @lettersSelector } li:not(.completed):contains('#{ ch }')").first()
          selectLetter elem
        )

    nextRound: ->
      @addInfo()
      super
      
    initData: (data) ->
      super data
      @totalRounds = data.W.length

    addInfo: ->
      d = @data.W[@round]
      @info[@round] = id: d.id, ref: (@roundMistakes()+1), mispeell: @typedWord
      Console.info "Added info", @info[@round]

    goRound: (round) ->
      super round
      @typedWord = ""
      data = @data.W[round]
      $("#{ @lettersSelector } li").removeClass('completed').find('b').css 
          top: 0
          left: 0
      $("#{ @placeholderSelector } li").removeClass 'completed'
      @scope.word = data.m
      @scope.translation = $.trim(data.w).split ''
      dist = $.trim(data.dist or '').split ''
      @scope.translation_shuffled = _.shuffle [].concat(@scope.translation, dist)
      @scope.$apply()

    roundPoints: -> 
      mistakes = @roundMistakes()
      100-25*mistakes
  
  # FatfingersController.$inject = ['$scope','GamesPlayed']
  # FatfingersController
