
# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "Underscore", "jQuery"], (Console, soundManager, _, $) ->
  "use strict"

  class GameController
    constructor: (@scope, @element, @attrs, @GamesPlayed) ->
      # Console.info 'Init controller of game', @, games
      @id = @attrs.gameId
      @name = @attrs.gameTitle
      @description = @attrs.gameDescription

      @initScope()

    @maxMistakes: 3

    points: 0
    mistakes: {}
    info: []
    knownWords: []

    initScope: ->
    
    playAudio: (sound_id) ->
      if sound_id in soundManager.sounds and @$scope.$root.audio
        soundManager.play sound_id
    
    addPoints: (points) ->
      if not points
        @points = 0
      else
        @points += points
      @scope.$root.gamePoints = @points
    
    markWord: (id, word, known) ->
      if finded = _.find(@knownWords, (data) -> data.id == id)
        finded.known = known or false
      else
        @knownWords.push {word:word,id:id,known:known}
      
      notKnown = if not known then 'not ' else ''
      Console.info "Marked word #{word} as #{notKnown}known"

      @scope.$root.gameWords = @knownWords

    pause: ->
      Console.info 'Pause'
      @setStatus 'paused'
      @clock.pause()
    
    resume: ->
      Console.info 'Resume'
      @setStatus false
      @clock.resume()

    setStatus: (status) ->
      Console.info "Settings status #{status}"
      @scope.$root.gameStatus = status
      @scope.active = not status
      @scope.$root.$apply()

    preStart: ->
      if DEBUG
        @setStatus false
        @start()
        return
      status = ['ready','set','go'].reverse()
      @setStatus(status.pop())
      interval = setInterval =>
        if !status.length
          @setStatus false
          @start()
          clearInterval(interval)
        else
          @setStatus(status.pop())
      , 1000

    initData: (@data) ->
      Console.info 'Init data', @data
      @variation = parseInt(@data.vid)
      @time = @data.time or @data.seconds
      @knownWords = []

      @scope.$root.totalRounds = @totalRounds = @data.W.length
      @scope.$root.gameTitle = @name
      @scope.$parent.gameVariation = @variation

    play: (data, @onFinish, @diagnostic) ->
      Console.group "Game #{@name}"
      @initData(data)
      @preStart()

    unplay: ->
      Console.info "Exiting game"
      @clock.pause()
      @scope.active = false
      Console.groupEnd()

    finish: ->
      @onFinish() if @onFinish
      @sendData()
      @unplay()

    timeout: ->
      Console.info "Timeout!"
      @setStatus 'timeout'
      timeout = setTimeout (=> @finish()), 1000

    goRound: (@round) ->
      Console.info "Round #{@round} of #{@totalRounds}"
      @scope.$root.round = @round

    start: ->
      Console.info 'Start'
      @scope.$root.gameRemainSeconds = @time
      @clock = $('#game-clock').tzineClock @time, =>
        @timeout()
      , (seconds,total) => 
        @scope.$root.gameRemainSeconds = total-seconds
        @scope.$root.$apply()
      @addPoints()
      @goRound(0)
      @setLifes(1)

    makeMistake: ->
      Console.info 'Mistake'
      @mistakes[@round] ?= 0;
      @mistakes[@round]++
      if @mistakes[@round] >= @maxMistakes
        @kill()
        return false
      return true

    roundMistakes: -> @mistakes[@round] or 0

    gameOver: ->
      Console.info "Game Over!"
      @setStatus 'gameover'
      timeout = setTimeout (=> @finish()), 1000

    setLifes: (@lifes) ->
      Console.info "Set lifes to #{@lifes}"
      @scope.$root.gameLifes = @lifes
      if @lifes == 0
        @gameOver()
        false
      true

    kill: ->
      if @setLifes(@lifes-1)
        @nextRound()

    sendData: ->
      Console.info "Seding data", @
      @GamesPlayed.send @
    
    timeout = null
    
    nextRound: ->
      clearTimeout timeout if timeout
      if @round<@totalRounds-1
        f = (=> @goRound(@round+1))
      else
        f = @finish
      timeout = setTimeout (=> f()), 1000

  GameController.$inject = ['$scope','$element','$attrs','GamesPlayed']
  GameController