define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering DataService module."
  service = ($resource) ->
    $resource "mock/data/:id.json", {},
      query:
        method: "GET"
        params:
          id: "list"
        isArray: true

  service.$inject = ["$resource"]
  Console.groupEnd()
  service