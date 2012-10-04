define ["Console", "directives/screens", "directives/screen", "directives/dialog", "directives/game", "directives/gameVariation", "directives/games", "directives/popups", "directives/popup"], (Console, screens, screen, dialog, game, gameVariation, games, popups, popup) ->
  "use strict"
  Console.group "Entering Directives module."
  Console.groupEnd()
  ->
    angular.module("uspeak.directives", [])
    	.directive("screens", screens)
    	.directive("screen", screen)
    	.directive("dialog", dialog)
    	.directive("games", games)
    	.directive("gameVariation", gameVariation)
    	.directive("game", game)
    	.directive("popups", popups)
    	.directive "popup", popups
    Console.debug "Custom directives initialized."
