define [
  "Console",
  "controllers/App",
  "controllers/games/Whichone",
  "controllers/games/Association",
  "controllers/games/Fatfingers",
  "controllers/games/Challenge",
  "controllers/games/Flipcards",
  "controllers/games/Yayornay",
  "controllers/games/Braintickle",
  "controllers/popups/Login",
  "controllers/popups/PostGame",
  "controllers/popups/PostGameWords",
  "controllers/screens/DiagnosticGames",
  "controllers/screens/DiagnosticRegister",
  "controllers/screens/UserHome"
  "controllers/screens/UserGames"
  ], (Console, app, whichone, association, fatfingers, challenge, flipcards, yayornay, braintickle, plogin, ppostgame, ppostgamewords, sdiagnosticgames, sdiagnosticregister, suserhome, susergames) ->
  "use strict"
  Console.group "Entering controllers module."
  Console.info "App", app
  Console.info "Whichone", whichone
  Console.info "Association", association
  Console.info "Fatfingers", fatfingers
  Console.info "Challenge", challenge
  Console.info "Flipcards", flipcards
  Console.info "YayorNay", yayornay
  Console.info "Braintickle", braintickle
  Console.info "PopupLogin", plogin
  Console.info "PopupPostGame", ppostgame
  Console.info "PopupPostGameWords", ppostgamewords
  Console.info "DiagnosticGames", sdiagnosticgames
  Console.info "DiagnosticRegister", sdiagnosticregister
  Console.info "UserHome", suserhome
  Console.info "UserGames", susergames
  
  Console.groupEnd()
  
  ->
    Console.debug "Custom controllers initialized."
    angular.module("uspeak.controllers", [])
      .controller("App", app)
      .controller("Game-Whichone", whichone)
      .controller("Game-Association", association)
      .controller("Game-Fatfingers", fatfingers)
      .controller("Game-Challenge", challenge)
      .controller("Game-Flipcards", flipcards)
      .controller("Game-Yayornay", yayornay)
      .controller("Game-Braintickle", braintickle)
      .controller("Popup-Login", plogin)
      .controller("Popup-PostGame", ppostgame)
      .controller("Popup-PostGameWords", ppostgamewords)
      .controller("Screen-DiagnosticGames", sdiagnosticgames)
      .controller("Screen-DiagnosticRegister", sdiagnosticregister)
      .controller("Screen-UserHome", suserhome)
      .controller("Screen-UserGames", susergames)

