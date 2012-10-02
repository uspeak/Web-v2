define ["Console", "build/controllers/AppController", "build/controllers/games/WhichoneController", "build/controllers/games/AssociationController", "build/controllers/games/FatfingersController", "build/controllers/games/ChallengeController", "build/controllers/games/FlipcardsController", "build/controllers/games/YayornayController", "build/controllers/games/BraintickleController"], (Console, app, whichone, association, fatfingers, challenge, flipcards, yayornay, braintickle) ->
  "use strict"
  Console.group "Entering controllers module."
  Console.info "AppController", app
  Console.info "WhichoneController", whichone
  Console.info "AssociationController", association
  Console.info "FatfingersController", fatfingers
  Console.info "ChallengeController", challenge
  Console.info "FlipcardsController", flipcards
  Console.info "YayorNayController", yayornay
  Console.info "BraintickleController", braintickle
  Console.groupEnd()
  
  ->
    Console.debug "Custom controllers initialized."
    angular.module("uspeak.controllers", [])
      .controller("App", app)
      .controller("Game-whichone", whichone)
      .controller("Game-association", association)
      .controller("Game-fatfingers", fatfingers)
      .controller("Game-challenge", challenge)
      .controller("Game-flipcards", flipcards)
      .controller("Game-yayornay", yayornay)
      .controller "Game-braintickle", braintickle

