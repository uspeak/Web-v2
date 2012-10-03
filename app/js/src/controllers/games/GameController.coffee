
# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery"], (Console, soundManager, $) ->
  "use strict"

  class GameController
    constructor: (@scope, @element, @attrs, @GamesPlayed) ->
      # Console.info 'Init controller of game', @, games
      @id = @attrs.gameId
      @name = @attrs.gameTitle
      @description = @attrs.gameDescription

      @initScope()

    @maxMistakes: 3

    @lifes: 3
    mistakes: {}
    info: {}

    initScope: ->
    
    playAudio: (sound_id) ->
      if sound_id in soundManager.sounds and @$scope.$root.audio
        soundManager.play sound_id
    
    addPoints: (points) ->
      @points += points
    
    pause: ->
      Console.info 'Pause'
      @scope.active = false
      @clock.pause()
    
    resume: ->
      Console.info 'Resume'
      @scope.active = true
      @clock.resume()

    preStart: ->
      states = $('#game-pretexts').children()
      states_progress = 0
      state = states.first()
      state.addClass 'visible'
      interval = setInterval =>
        state.removeClass 'visible'
        state = state.next()
        if !state.length
          @scope.active = true
          @start()
          clearInterval(interval)
        else
          state.addClass 'visible'
      , 1000

    initData: (@data) ->
      Console.info 'Init data', @data
      @variation = parseInt(@data.vid)
      @time = @data.time or @data.seconds

      @scope.$root.totalRounds = @totalRounds = @data.W.length
      @scope.$root.gameTitle = @name
      @scope.$parent.gameVariation = @variation

    play: (data, @onFinish, @diagnostic) ->
      Console.group "Game #{@name}"
      @initData(data)
      @preStart()

    unplay: ->
      @clock.pause()
      @scope.active = false
      Console.groupEnd()

    finish: ->
      (@onFinish or ->)()
      @unplay()

    timeout: ->
      Console.info "Timeout!"
      @scope.active = false
      timeout = setTimeout @finish, 1000

    goRound: (@round) ->
      Console.info "Round #{ @round } of #{ @totalRounds }"
      @scope.$root.round = @round

    start: ->
      Console.info 'Start'
      @scope.$root.gameRemainSeconds = @time
      @clock = $('#game-clock').tzineClock @time, =>
        @timeout()
      , (seconds,total) => 
        @scope.$root.gameRemainSeconds = total-seconds
        @scope.$root.$apply()
      @goRound(0)

    mistake: ->
      Console.info 'Mistake'
      @mistakes[@round] ?= 0;
      @mistakes[@round]++
      if @mistakes[@round] >= @maxMistakes
        @kill()
        return false
      return true

    kill: ->
      Console.info 'Kill life'
      @scope.$root.lifes -= 1
      @scope.$root.$apply()
      if @scope.$root.lifes == 0
        @finish()
      else
        @nextRound()

    sendData: ->
      @GamesPlayed.send @, {}
    
    timeout = null
    
    nextRound: ->
      clearTimeout timeout if timeout
      if @round<@totalRounds-1
        f = (=> @goRound(@round+1))
      else
        f = @finish
      timeout = setTimeout f, 1000

    calcPoints: (errors) -> 0

  GameController.$inject = ['$scope','$element','$attrs','GamesPlayed']
  GameController