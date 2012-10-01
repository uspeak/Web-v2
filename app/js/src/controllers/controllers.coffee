define ["Console", "build/controllers/AppController", "build/controllers/games/SelectGenericController", "build/controllers/games/FatfingersController", "build/controllers/games/FlipcardsController", "build/controllers/games/YayornayController", "build/controllers/games/BraintickleController"], (Console, app, selectGeneric, fatfingers, flipcards, yayornay, braintickle) ->
  "use strict"
  Console.group "Entering controllers module."
  Console.info "AppController", app
  Console.info "SelectGenericController", selectGeneric
  Console.info "FatfingersController", fatfingers
  Console.info "FlipcardsController", flipcards
  Console.info "YayorNayController", yayornay
  Console.info "BraintickleController", braintickle
  Console.groupEnd()
  
  ->
    Console.debug "Custom controllers initialized."
    angular.module("uspeak.controllers", [])
      .controller("App", app)
      .controller("Game-whichone", selectGeneric)
      .controller("Game-association", selectGeneric)
      .controller("Game-fatfingers", fatfingers)
      .controller("Game-flipcards", flipcards)
      .controller("Game-yayornay", yayornay)
      .controller "Game-braintickle", braintickle

