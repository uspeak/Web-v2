define ["Console", "Underscore", "services/DiagnosticWordsService", "services/UserService", "services/GameWordsService", "services/ChallengeWordsService", "services/GamesService", "services/GamesPlayed"], (Console, _, dws, us, gws, cws, gs, gp) ->
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
      ).factory("games", ->
        new (class 
          games: []
          register: (gameController, attrs) ->

            gameController.id = parseInt(attrs.gameId)
            gameController.name = attrs.gameTitle
            gameController.description = attrs.gameDescription
            gameController.controller = attrs.gameController.toLowerCase()

            Console.info "Registered game #{gameController.name}", gameController
            @games.push gameController

          get: (key, value) ->
            _.find(@games, (obj) ->
              obj[key] is value
            ) or {}

          id: (value) ->
            @get "id", parseInt(value)

          controller: (value) ->
            @get "controller", value
        )()
      )