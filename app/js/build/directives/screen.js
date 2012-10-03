// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "jQuery", "Underscore"], function(Console, $, _) {
    "use strict";
    Console.group("Entering screen directive module.");
    Console.groupEnd();
    return function($compile, $controller) {
      return {
        require: "^screens",
        restrict: "E",
        transclude: true,
        scope: {
          title: "@",
          screenId: "@"
        },
        controller: function($scope, $element, $attrs) {
          var dialogIndex, dialogs, find_dialog, recursiveDialog, resetDialogs,
            _this = this;
          dialogs = $scope.dialogs = [];
          dialogIndex = 0;
          this.addDialog = function(scope, element, attrs) {
            var index;
            index = parseInt(attrs.dialogIndex) || dialogs.length + 1;
            Console.info("Registered dialog " + index + " in screen " + $attrs.screenId, scope, attrs, _this);
            return dialogs.push({
              index: index,
              scope: scope,
              element: element,
              attrs: attrs
            });
          };
          find_dialog = function(index) {
            return _.find(dialogs, function(dialog) {
              return dialog.index === index;
            });
          };
          resetDialogs = function() {
            return _.each(dialogs, function(dialog) {
              return dialog.scope.show = dialog.scope.hide = false;
            });
          };
          recursiveDialog = function(index, show, onfinish) {
            var animation, dialog, dialog_element, elem, next;
            next = (show ? 1 : -1);
            dialog = find_dialog(index);
            if (dialog) {
              elem = $(dialog.element);
              Console.info((show ? "Showing" : "Hiding") + " dialog ", index, dialog, elem, $scope);
              dialog_element = $(dialog.element);
              if ($scope.$root.effects) {
                animation = void 0;
                if (index === 1) {
                  animation = (show ? "bounceInDown" : "bounceOutUp");
                } else {
                  animation = (show ? "FlipDialog" : "FlipDialogBack");
                }
                dialog.scope.show = show;
                return dialog_element.keyframe(animation, (index > 1 ? 600 : 1000), function() {
                  if (!show) {
                    dialog.scope.show = false;
                  }
                  return recursiveDialog(index + next, show, onfinish);
                });
              } else {
                dialog.scope.show = show;
                return recursiveDialog(index + next, show, onfinish);
              }
            } else {
              return onfinish(index - next);
            }
          };
          $scope.show = function(onfinish) {
            onfinish = onfinish || function() {};
            $scope.active = true;
            $scope.$apply();
            return recursiveDialog(1, true, function(i) {
              dialogIndex = i;
              return onfinish(i);
            });
          };
          return $scope.hide = function(onfinish) {
            onfinish = onfinish || function() {};
            return recursiveDialog(dialogIndex, false, function(i) {
              dialogIndex = i;
              resetDialogs();
              $scope.active = false;
              $scope.$apply();
              return onfinish(i);
            });
          };
        },
        link: function(scope, element, attrs, screensCtrl) {
          return screensCtrl.addScreen(scope, element, attrs);
        },
        template: "<div class=\"screen\" ng-class=\"{active: active}\" ng-transclude></div>",
        replace: true
      };
    };
  });

}).call(this);
