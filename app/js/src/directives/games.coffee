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
        angular.forEach games.games, (game, name) ->
          game.scope.active = false

        gameId = gameData.gid
        game = games.id(gameId)
        $scope.$root.hideScreen ->
          Console.group "Game #{gameData.title}"
          $game.addClass "play"
          $scope.$parent.title = game.attrs.gameTitle
          game_active = game
          game.play gameData, onFinish, diagnostic

        game

      unplay = ->
        Console.groupEnd()
        $game.removeClass "play"
        angular.forEach games.games, (game, name) ->
          if game.scope.active
            game.scope.active = false
            game.unplay()

        game_active = `undefined`

      $scope.resumeGame = (gameId) ->
        $scope.paused = false
        game_active.resume()

      $scope.pauseGame = ->
        $scope.paused = true
        game_active.pause()

      $scope.$parent.exit = ->
        if game_active.isDiagnostic
          $scope.goScreen "diagnostic-games-intro"
        else
          $scope.goScreen "user-games"
        unplay()

      $scope.$parent.playDiagnosticGame = (gameId, gameData) ->
        game = play(gameData, ->
          Console.info "Finished game"
          $scope.diagnostic.gameIndex += 1
          if $scope.diagnostic.finished()
            $scope.goScreen "diagnostic-register"
          else
            $scope.goScreen "diagnostic-games-intro"
          unplay()
        , true)

      $scope.$parent.playGame = (gameId) ->
        $game.addClass "loading"
        gameInfo = games.id(gameId)
        Console.info "Loading game", gameInfo
        onFinish = (data) ->
          $game.removeClass "loading"
          Console.info "Game loaded", data
          game = play(data, ->
            Console.info "Finished game"
            $scope.goScreen "user-games"
            unplay()
          )
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
