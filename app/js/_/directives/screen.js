define(['Console','jQuery','Underscore'], function (Console,$,_) {
    "use strict";
    Console.group("Entering screen directive module.");

    var directive = function($compile,$controller) {
      var template = '<div class="screen" ng-class="{active:active}" nga-controller="Screen-{0}">' + /* ng-controller="prueba" */
          '</div>';
      return {
        require: '^screens',
        restrict: 'E',
        transclude: true,
        scope: { title: '@',screenId:'@' },
        controller: function($scope, $element, $attrs) {
          var dialogs = $scope.dialogs = [];
          var $this = this;
          var dialogIndex=0;
          this.addDialog = function (scope,element, attrs) {
            var index = attrs.dialogIndex;
            Console.info("Registered dialog {0} in screen {1}".format(index,$attrs.screenId), scope,attrs,$this);
            dialogs.push({
              index:parseInt(index) || dialogs.length+1,
              scope:scope,
              element:element,
              attrs:attrs,
            });
          }
          var find_dialog = function(index) {
            return _.find(dialogs,function(dialog) {
              return dialog.index==index;
            });
          }
          var resetDialogs = function() {
            _.each(dialogs,function(dialog) {
              dialog.scope.show = dialog.scope.hide = false;
            })
          }
          var recursiveDialog = function(index,show,onfinish) {
            var next = show?1:-1;
            var dialog = find_dialog(index);
            if (dialog) {
              var elem = $(dialog.element);
              Console.info('{0} dialog '.format(show?'Showing':'Hiding'),index,dialog,elem,$scope);
              // dialog.scope.show = show;
              // dialog.scope.hide = !show;
              var dialog_element = $(dialog.element);
              if ($scope.$root.effects) {
                var animation;
                if (index==1) animation = show?'bounceInDown':'bounceOutUp';
                else animation = show?'FlipDialog':'FlipDialogBack'
                if (show) dialog_element.addClass('show');
                // if (show && index==1) dialog_element.css({trand:-2000})
                dialog_element.keyframe(animation, (index>1)?600:1000, function() {
                  if (!show) dialog_element.removeClass('show');
                  // else  dialog_element.css({y:0})
                  recursiveDialog(index+next,show,onfinish);
                });
              }
              else {
                if (show) $(dialog.element).addClass('show');
                else $(dialog.element).removeClass('show');
                recursiveDialog(index+next,show,onfinish);
              }
              // dialog.scope.$apply();
            }
            else onfinish(index-next);
          }
          $scope.show = function(onfinish) {
            onfinish = onfinish || function() {};
            $scope.active = true;
            $scope.$apply();
            recursiveDialog(1,true,function(i) {
              dialogIndex=i;
              onfinish(i);
            });

          }
          $scope.hide = function (onfinish) {
            onfinish = onfinish || function() {};
            recursiveDialog(dialogIndex,false,function(i) {
              dialogIndex=i;
              resetDialogs();
              $scope.active = false;
              $scope.$apply();
              onfinish(i);
            });
          }
        },
        // compile:function (tElement, tAttrs, transclude) {
        //   var self = this;
        //   var transclude = tElement.contents();
        //   var new_html = angular.element(template.format(tAttrs['screenId']));
        //   new_html.append(transclude);
        //   $controller(self.controller);
        //   return function (scope, element, attrs, screensCtrl) {
        //       element.replaceWith(new_html)
        //       $compile(new_html)(scope);
              
        //       screensCtrl.addScreen(scope, new_html, attrs);
        //       self.controller(scope, new_html, attrs);
        //   }
        // },
        // replace: true
        link: function(scope, element, attrs, screensCtrl) {
          screensCtrl.addScreen(scope,element,attrs)
        },
        template:
          '<div class="screen" ng-class="{active: active}" ng-transclude>' +
          '</div>',
        replace: true
      };
    }

    Console.groupEnd();
    return directive;
});
