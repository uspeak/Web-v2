define ["Console"], (Console) ->
  "use strict"
  Console.group "Entering DiagnosticWords service module."
  service = ($resource, $http) ->
    $resource "#{ API_BASE }diagnostics/getDiagnosticWordsBeta3/:lang_dir/:profile.json", {},
      update:
        method: "PUT"
      get:
        method: "GET"
    
  Console.groupEnd()
  service
