define ["Console", "Underscore", "jQuery"], (Console, _, $) ->
  "use strict"
  ($scope, GamesService, games) ->
    game = $('#game')
    $scope.$parent.goGames = ->
      Console.group "User games"
      game.addClass "loading"
      Console.info "Loading"
      GamesService.get
        lang_dir: LANG_DIR
      , (response) ->
        game.removeClass "loading"
        Console.info "Data loaded: ", response
        Console.groupEnd()
        $scope.$parent.gameList = _.map(response.Games, (game) ->
          game.Game.type = games.id(parseInt(game.Game.id)).type
          game.Game
        )
        $scope.gameIndex = 0
        $scope.$apply()
        $scope.goScreen "user-games"
    
    $scope.$parent.prevGame = ->
      $scope.$parent.gameIndex = $scope.$parent.gameIndex-1
    
    $scope.$parent.nextGame = ->
      $scope.$parent.gameIndex = $scope.$parent.gameIndex+1
