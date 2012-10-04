define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering Games service module."
  service = ($resource, $http) ->
    $resource "#{ API_BASE }userGames/getUserGames/:lang_dir.json", {},
      update:
        method: "PUT"
      get:
        method: "GET"
        # isArray: true

  Console.groupEnd()
  service
