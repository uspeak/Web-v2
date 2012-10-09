define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  ($scope, user) ->
    $scope.register = ->
      $this = this
      form = $("#user-register")
      form.find(".error[name]").removeClass "error"
      user_errors = form.find(".error-messages span")
      user_errors.removeClass "visible"
      user.register
        username: @user_name or ""
        password: @user_pass or ""
        email: @user_email or ""
        profile: 3
        lang_dir: LANG_DIR
        points: 1000
      ,
        success: (data) ->
          $scope.goScreen "user-home"

        error: (err) ->
          console.log err
          error = user_errors.filter("[data-error={0}]".format(err))
          field = form.find("[name=\"{0}\"]".format(error.data("error-field")))
          offset = field.position()
          error.css(
            top: offset.top + field.outerHeight(true) * 3 / 2 - error.height()
            left: offset.left + field.outerWidth(true)
          ).addClass "visible"
          field.addClass "error"
          console.log error, field
