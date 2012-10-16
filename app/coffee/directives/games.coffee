# lib/console/console
# lib/jquery/jquery
define ["Console", "Underscore", "jQuery"], (Console, _, $) ->
  "use strict"
  Console.group "Entering games directive module."
  Console.groupEnd()
  ->
    restrict: "E"
    transclude: true
    scope: true
    template: """<div class="games" ng-transclude></div>"""
    replace: true
    controller: ($scope, $element, games, GameWordsService, ChallengeWordsService) ->
      game_active = undefined
      $game = $("#game")

      play = (gameData, onFinish, diagnostic) ->
        gameData = gameData[0] if _.isArray(gameData)
        gameId = gameData.gid
        game = games.id(gameId)
        $scope.$parent.gamePaused = false
        $scope.$root.hideScreen ->
          $game.addClass "play"
          game_active = game
          game.play gameData, onFinish, diagnostic

        game

      unplay = ->
        $game.removeClass "play"
        game_active.unplay()
        game_active = `undefined`

      $scope.$parent.togglePlay = ->
        if game_active.scope.active
          game_active.pause()
        else
          game_active.resume()

      $scope.$root.exitGame = ->
        return if not game_active
        Console.info "Exiting game"
        if game_active.diagnostic
          $scope.goScreen "diagnostic-games-intro"
        else
          $scope.goScreen "user-games"
        unplay()

      $scope.$parent.playDiagnosticGame = (gameData) ->
        game = play gameData, ->
          Console.info "Finished game"
          $scope.diagnostic.gameIndex += 1
          $scope.goScreen (if $scope.diagnostic.finished() then "diagnostic-register" else "diagnostic-games-intro")
          unplay()
        , true

      $scope.$parent.playGame = (gameId) ->
        $game.addClass "loading"
        gameInfo = games.id(gameId)
        Console.info "Loading game", gameInfo
        onFinish = (data) ->
          $game.removeClass "loading"
          Console.info "Game loaded", data
          game = play data, ->
            Console.info "Finished game"
            # $scope.goScreen "user-games"
            popup = $scope.showPopup 'postgame'
            popup.scope.$parent.game = game_active
            # unplay()
        if gameId != 8
          GameWordsService.get
            lang_dir: LANG_DIR
            game: gameInfo.id
          , onFinish
        else
          ChallengeWordsService.get
            lang_dir: LANG_DIR
          , onFinish

      $scope.$parent.gameDescription = (gameId) ->
        games.id(gameId).description if gameId

      $scope.$parent.gameController = (gameId) ->
        games.id(gameId).controller if gameId

      @addGame = (scope, element, attrs) ->
        controller = element.controller()
        games.register(controller, attrs)
