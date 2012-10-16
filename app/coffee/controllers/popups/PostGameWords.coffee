define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, $element, user, UserWordStatus) ->
    $scope.$parent.openWord = ->
      Console.info '****************** OPENED WORD', @
      @$parent.openedWord = if @word.id!=@openedWord then @word.id  else false
      if not @loaded
        UserWordStatus.get
          word: @word.id
        , (response) =>
          @loaded = true
          @data = response