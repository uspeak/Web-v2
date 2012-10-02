define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering GameWords service module."
  service = ($resource, $http) ->
    ChallengeWords = $resource "#{ API_BASE }challenges/getChallengesWords/:lang_dir.json", {},
      get: # es un Array porque puede devolver más de una instancia de juego (para jugar Offline, por ejemplo.)
        method: "GET"

    $get = ChallengeWords.get
    ChallengeWords.get = (data, f) ->
      $get data, (resp) =>
        d = resp.Words[0]
        d.gid = 8
        # Console.info "*******************____________", d, f
        f.call @, d
    ChallengeWords

  Console.groupEnd()
  service
