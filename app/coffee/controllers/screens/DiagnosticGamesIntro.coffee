define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, DiagnosticWordsService) ->
    game = $('#game')
    $scope.$parent.loadDiagnostic = ->
      Console.group "Diagnostic"
      diagnostic_data =
        lang_dir: LANG_DIR
        profile: $scope.$root.diagnostic.level + 1

      Console.info "Loading: ", diagnostic_data
      game.addClass "loading"
      DiagnosticWordsService.get diagnostic_data, (response) ->
        game.removeClass "loading"
        diagnosticWords = response
        Console.info "Data loaded: ", response
        Console.groupEnd()
        $scope.goScreen "diagnostic-games-intro"
