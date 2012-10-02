define ["Console", "Underscore", "Angular"], (Console, _, angular) ->
  "use strict"
  Console.group "Entering Filters module."
  Console.groupEnd()
  ->
    angular.module("uspeak.filters", []).filter "shuffle", asFunc((s) ->
      s = s.split("") if s.substring
      _.shuffle s
    )
    Console.debug "Custom filters initialized."
