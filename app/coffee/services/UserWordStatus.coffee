define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering UserWordStatus service module."
  service = ($resource, $http) ->
    $resource "#{ API_BASE }wordMasteryLevels/getUserWordStatus/:word.json", {},
      get:
        method: "GET"

  Console.groupEnd()
  service
