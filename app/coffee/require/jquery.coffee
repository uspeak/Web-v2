unless window.jQuery
  define ["Console", "https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"], (Console) ->
    Console.group "Entering jQuery module."
    Console.info "jQuery: ", $
    Console.groupEnd()
    $
