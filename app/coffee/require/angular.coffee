define ["Console", "order!http://ajax.googleapis.com/ajax/libs/angularjs/1.0.2/angular.min.js", "order!http://code.angularjs.org/1.0.2/angular-resource.min.js"], (Console) ->
  
  #'order!libs/angular/angular-ie-compat',
  Console.group "Entering Angular module."
  Console.info "Angular: ", angular
  _.noConflict() and Console.debug("_.noConflict()")  unless typeof _ is "undefined"
  $.noConflict() and Console.debug("$.noConflict()")  unless typeof $ is "undefined"
  Console.debug "Global names removed."
  Console.groupEnd()
  angular
