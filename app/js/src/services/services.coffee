define ["Console", "Underscore", "build/services/DiagnosticWordsService", "build/services/UserService", "build/services/GameWordsService", "build/services/ChallengeWordsService", "build/services/GamesService", "build/services/GamesPlayed"], (Console, _, dws, us, gws, cws, gs, gp) ->
  "use strict"
  Console.group "Entering Service module."
  Console.info "DiagnosticWordsService", dws
  Console.groupEnd()
  ->
    Console.debug "Custom services initialized."
    angular.module("uspeak.diagnostic.resources", ["ngResource"])
      .factory("DiagnosticWordsService", dws)
      .factory("GameWordsService", gws)
      .factory("ChallengeWordsService", cws)
      .factory("UserService", us)
      .factory("GamesService", gs)
      .factory("GamesPlayed", gp)
      .factory("user", (UserService) ->
        user = new UserService()
        user.setToken "testtoken" if DEBUG
        user
      ).factory("games",
        class 
          games: []
          register: (gameController, attrs) ->

            gameController.id = parseInt(attrs.gameId)
            gameController.title = attrs.gameTitle
            gameController.description = attrs.gameDescription
            gameController.controller = attrs.gameController

            Console.info "Registered game #{gameController.title}", gameController
            @games.push gameController

          get: (key, value) ->
            _.find(@games, (obj) ->
              obj[key] is value
            ) or {}

          id: (value) ->
            @get "id", parseInt(value)

          controller: (value) ->
            @get "controller", value
      )