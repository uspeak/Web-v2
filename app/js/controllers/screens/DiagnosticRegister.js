// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "jQuery"], function(Console, $) {
    "use strict";
    return function($scope, user) {
      return $scope.register = function() {
        var $this, form, user_errors;
        $this = this;
        form = $("#user-register");
        form.find(".error[name]").removeClass("error");
        user_errors = form.find(".error-messages span");
        user_errors.removeClass("visible");
        return user.register({
          username: this.user_name || "",
          password: this.user_pass || "",
          email: this.user_email || "",
          profile: 3,
          lang_dir: LANG_DIR,
          points: 1000
        }, {
          success: function(data) {
            return $scope.goScreen("user-home");
          },
          error: function(err) {
            var error, field, offset;
            console.log(err);
            error = user_errors.filter("[data-error={0}]".format(err));
            field = form.find("[name=\"{0}\"]".format(error.data("error-field")));
            offset = field.position();
            error.css({
              top: offset.top + field.outerHeight(true) * 3 / 2 - error.height(),
              left: offset.left + field.outerWidth(true)
            }).addClass("visible");
            field.addClass("error");
            return console.log(error, field);
          }
        });
      };
    };
  });

}).call(this);
