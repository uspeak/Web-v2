define([
  // Standard Libs
  'Console'   // lib/console/console

  // Custom Services
  , 'directives/screens'
  , 'directives/screen'
  , 'directives/dialog'
  , 'build/directives/game'
  , 'directives/gameVariation'
  , 'build/directives/games'
  , 'directives/popups'
  , 'directives/popup'
], function(Console, screens, screen, dialog, game, gameVariation, games, popups, popup){
  "use strict";
  Console.group("Entering Directives module.");

  var initialize = function () {
    angular.module('uspeak.directives',[]).
      directive('screens', screens).
      directive('screen', screen).
      directive('dialog', dialog).
      directive('games', games).
      directive('gameVariation', gameVariation).
      directive('game', game).
      directive('popups', popups).
      directive('popup', popups)
    ;
    Console.debug("Custom directives initialized.");
  }

  Console.groupEnd();
  return { 
    initialize: initialize
  };
});
