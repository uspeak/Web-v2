# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","build/controllers/games/SelectGenericController"], (Console, soundManager, $, SelectGenericController) ->
  "use strict"

  class WhichoneController extends SelectGenericController
