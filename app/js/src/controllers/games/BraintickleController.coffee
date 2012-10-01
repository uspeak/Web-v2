# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","build/controllers/games/GameController"], (Console, soundManager, $, GameController) ->
  "use strict"

  class SelectGenericController extends GameController