// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "jQuery"], function(Console, $) {
    "use strict";
    return function($scope, $element, user) {
      return $scope.$parent.login = function() {
        var _this = this;
        this.$parent.loading_api = true;
        return user.login(this.login_name, this.login_pass, {
          success: function(data) {
            _this.$parent.loading_api = false;
            $scope.hidePopup();
            return $scope.goScreen("user-home");
          },
          error: function(err) {
            _this.$parent.loading_api = false;
            Console.info("Failed login");
            return $($element).cssanimation("incorrect", 400);
          }
        });
      };
    };
  });

}).call(this);
