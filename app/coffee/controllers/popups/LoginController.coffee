define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, user) ->
    $scope.$parent.login = ->
      user.login @login_name, @login_pass,
        success: (data) ->
          $scope.hidePopup()
          $scope.goScreen "user-home"

        error: (err) =>
          Console.info "Failed login" 
          $('.popup').cssanimation "incorrect", 400
