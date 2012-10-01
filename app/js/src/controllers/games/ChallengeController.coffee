# Standard Libs
# lib/console/console
define ["Console", "SoundManager", "jQuery","build/controllers/games/FatfingersController"], (Console, soundManager, $, FatfingersController) ->
  "use strict"

  class ChallengeController extends FatfingersController
    placeholderSelector: '#game-challenge-placeholder'
    lettersSelector: '#game-challenge-letters'
