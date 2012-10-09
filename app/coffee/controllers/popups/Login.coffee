define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, $element, user) ->
    $scope.$parent.login = ->
      @$parent.loading_api = true
      user.login @login_name, @login_pass,
        success: (data) =>
          @$parent.loading_api = false
          $scope.hidePopup()
          $scope.goScreen "user-home"

        error: (err) =>
          @$parent.loading_api = false
          Console.info "Failed login" 
          $($element).cssanimation "incorrect", 400
