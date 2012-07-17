define([
  // Standard Libs
  'Console'   // lib/console/console

  // Custom Services
  , 'directives/screens'
  , 'directives/screen'
  , 'directives/dialog'
  , 'directives/game'
  , 'directives/games'
], function(Console, screens, screen, dialog, game, games){
  "use strict";
  Console.group("Entering Directives module.");

  var initialize = function () {
    angular.module('uspeak.directives',[]).
      directive('screens', screens).
      directive('screen', screen).
      directive('dialog', dialog).
      directive('games', games).
      directive('game', game)
    ;
    Console.debug("Custom directives initialized.");
  }

  Console.groupEnd();
  return { 
    initialize: initialize
  };
});
