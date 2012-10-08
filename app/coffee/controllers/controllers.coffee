define ["Console", "controllers/AppController", "controllers/games/WhichoneController", "controllers/games/AssociationController", "controllers/games/FatfingersController", "controllers/games/ChallengeController", "controllers/games/FlipcardsController", "controllers/games/YayornayController", "controllers/games/BraintickleController", "controllers/popups/LoginController"], (Console, app, whichone, association, fatfingers, challenge, flipcards, yayornay, braintickle, plogin) ->
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
  Console.info "PopupLoginController", plogin
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
      .controller("Game-braintickle", braintickle)
      .controller("Popup-login", plogin)

