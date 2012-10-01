define ["Console", "Underscore", "build/services/DiagnosticWordsService", "build/services/UserService", "build/services/GameWordsService", "build/services/GamesService", "build/services/GamesPlayed"], (Console, _, dws, us, gws, gs, gp) ->
  "use strict"
  Console.group "Entering Service module."
  Console.info "DiagnosticWordsService", dws
  Console.groupEnd()
  ->
    Console.debug "Custom services initialized."
    angular.module("uspeak.diagnostic.resources", ["ngResource"]).factory("DiagnosticWordsService", dws).factory("GameWordsService", gws).factory("UserService", us).factory("GamesService", gs).factory("GamesPlayed", gp).factory("user", (UserService) ->
      user = new UserService()
      user.setToken "testtoken" if DEBUG
      user
    ).factory "games", ->
      new (class 
        data: [
          id: 1
          type: "flipcards"
          variations: [1, 2, 21, 22]
        ,
          id: 2
          type: "fatfingers"
          variations: [1, 2, 7, 21, 22]
        ,
          id: 3
          type: "whichone"
          variations: [1, 2, 7, 21, 22]
        ,
          id: 4
          type: "yayornay"
          variations: [12, 13, 14, 15, 16, 17, 18, 28, 29, 30, 31] #7,
        ,
          id: 5
          type: "braintickle"
          variations: [3, 12, 13, 14, 15, 16, 17, 18, 23, 25]
        ,
          id: 6
          type: "association"
          variations: [1, 2, 7, 9, 10]
        ]
        get: (key, value) ->
          _.find(@data, (obj) ->
            obj[key] is value
          ) or {}

        id: (value) ->
          @get "id", value

        type: (value) ->
          @get "type", value
      )()
