define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, DiagnosticWordsService) ->
    game = $('#game')
    level = 0
    $scope.$parent.loadDiagnostic = ->
      Console.group "Diagnostic"
      diagnostic_data =
        lang_dir: LANG_DIR
        profile: level + 1

      Console.info "Loading: ", diagnostic_data
      game.addClass "loading"
      DiagnosticWordsService.get diagnostic_data, (response) ->
        game.removeClass "loading"
        $scope.$root.diagnostic.response = response
        Console.info "Data loaded: ", response
        Console.groupEnd()
        $scope.goScreen "diagnostic-games-intro"

    goLevel= (l) ->
      Console.info "Set diagnostic level #{l}"
      $scope.$parent.level = level = l

    $scope.$parent.prevLevel = ->
      goLevel (3+level-1)%3;

    $scope.$parent.nextLevel = ->
      goLevel (3+level+1)%3;

    goLevel(0)

