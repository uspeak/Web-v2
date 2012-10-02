// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "jQuery"], function(Console, $) {
    "use strict";

    var directive;
    Console.group("Entering game screens module.");
    directive = function() {
      return {
        restrict: "E",
        transclude: true,
        controller: function($scope, $element) {
          var hided, historyScreens, moveBackground, moveMovable, screens, view;
          screens = $scope.screens = {};
          historyScreens = [];
          hided = false;
          moveBackground = function(prev, next, to) {
            var direction, easing, time, trees_back, trees_front, x;
            direction = (to === "left" ? "+" : "-");
            trees_back = $("#game-background .trees-back");
            trees_front = $("#game-background .trees-front");
            trees_back.css("x", direction + "=200px");
            trees_front.css("x", direction + "=500px");
            if ($scope.$root.effects) {
              x = (to === "left" ? 1000 : -1000);
              time = 1800;
              easing = "cubic-bezier(0.530, 0.180, 0.425, 0.860)";
              screens[prev].element.removeClass("effects").children(":not(.dialog,.static)").css({
                transformOrigin: "bottom center"
              }).transit({
                x: x,
                opacity: .5,
                scale: .8
              }, time, easing);
              return screens[next].element.addClass("effects").children(":not(.dialog,.static)").css({
                x: -x,
                opacity: .5,
                scale: .8,
                transformOrigin: "bottom center"
              }).transit({
                x: 0,
                opacity: 1,
                scale: 1
              }, time, easing);
            } else {
              screens[next].element.removeClass("effects").children(":not(.dialog,.static)").css({
                x: 0,
                y: 0,
                opacity: 1
              });
              return screens[prev].element.removeClass("effects").children(":not(.dialog,.static)").css({
                x: 0,
                y: 0,
                opacity: 1
              });
            }
          };
          moveMovable = function(to) {
            var direction;
            return direction = to === "left";
          };
          view = function(name, show, onfinish) {
            var screen;
            if (show) {
              Console.info("Viewing screen " + name);
            } else {
              Console.info("Hiding screen " + name);
            }
            screen = screens[name];
            hided = !show;
            if (show) {
              screen.scope.show(onfinish);
              historyScreens.push(name);
              $scope.title = screen.attrs.title || "None";
            } else {
              screen.scope.hide(onfinish);
            }
            $scope.$apply();
            return screen;
          };
          $scope.$root.hideScreen = function(onfinish) {
            return view(historyScreens[historyScreens.length - 1], false, onfinish);
          };
          $scope.$root.goScreen = function(name) {
            var lastScreen, screen, _onfinish;
            lastScreen = historyScreens[historyScreens.length - 1];
            _onfinish = function() {
              return view(name, true);
            };
            if (!hided) {
              if (lastScreen === name) {
                return false;
              } else if (lastScreen) {
                screen = view(lastScreen, false, _onfinish);
                moveBackground(lastScreen, name);
              } else {
                _onfinish();
              }
            } else {
              _onfinish();
            }
            return true;
          };
          $scope.$root.backScreen = function() {
            var lastScreen, prevScreen;
            lastScreen = historyScreens.pop();
            prevScreen = historyScreens[historyScreens.length - 1];
            view(lastScreen, false, function() {
              var screen;
              return screen = view(prevScreen, true);
            });
            return moveBackground(lastScreen, prevScreen, "left");
          };
          return this.addScreen = function(scope, element, attrs) {
            var name;
            name = attrs.screenId;
            Console.info("Registered screen " + name, scope, attrs);
            screens[name] = {
              scope: scope,
              element: element,
              attrs: attrs
            };
            if (attrs.hasOwnProperty("screenInit")) {
              $("#top-bar").one("animationend webkitAnimationEnd oanimationend MSAnimationEnd", function(e) {
                return $scope.goScreen(name);
              });
              if (!$scope.$root.effects) {
                return $("#top-bar").trigger("animationend");
              }
            }
          };
        },
        template: "<div class=\"screens\" ng-transclude></div>",
        replace: true
      };
    };
    Console.groupEnd();
    return directive;
  });

}).call(this);
