define ["Console", "jQuery", "Underscore", "Angular", "build/services/services", "build/directives/directives", "build/filters/filters", "build/controllers/controllers"], (Console, $, _, angular, services, directives, filters, controllers) ->
  "use strict"
  ->
    Console.group "Starting application."

    services()
    filters()
    directives()
    controllers()

    angular.module "uspeak", 
        ["uspeak.filters",
        "uspeak.diagnostic.resources",
        "uspeak.directives",
        "uspeak.controllers"]
        
    Console.info "Angular compiled and executed."
    Console.groupEnd() # [angular]
    Console.groupEnd() # [bootstrap]
