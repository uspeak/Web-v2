# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","controllers/games/SelectGeneric"], (Console, soundManager, $, SelectGenericController) ->
  "use strict"

  class AssociationController extends SelectGenericController
