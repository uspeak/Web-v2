define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering GameWords service module."
  service = ($resource, $http) ->
    $resource "#{ API_BASE }userGames/getGameWords/:lang_dir/:game.json", {},
      get: # es un Array porque puede devolver más de una instancia de juego (para jugar Offline, por ejemplo.)
        method: "GET"
        isArray: true

  Console.groupEnd()
  service
