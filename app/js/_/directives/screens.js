define([
    'Console'       // lib/console/console
    , 'jQuery'      // lib/jquery/jquery
], function (Console, $) {
    "use strict";
    Console.group("Entering game screens module.");

    var directive = function() {
      return {
        restrict: 'E',
        transclude: true,
        // scope: true,
        controller: function($scope, $element) {
          var screens = $scope.screens = {};
          var historyScreens = [];
          var hided = false;
          var moveBackground = function (prev,next,to) {
            var direction = to=='left'?'+':'-';
            var trees_back = $('#game-background .trees-back'),
                trees_front = $('#game-background .trees-front');
            trees_back.css('x',direction+'=200px')
            trees_front.css('x',direction+'=500px');
            if ($scope.$root.effects) {
              var x = to=='left'?1000:-1000;
              var time = 1800;
              var easing = 'cubic-bezier(0.530, 0.180, 0.425, 0.860)';
              screens[prev].element.removeClass('effects').children(':not(.dialog,.static)').css({transformOrigin: 'bottom center'}).transit({x:x,opacity:.5,scale:.8},time,easing);
              screens[next].element.addClass('effects').children(':not(.dialog,.static)').css({x:-x,opacity:.5,scale:.8,transformOrigin: 'bottom center'}).transit({x:0,opacity:1,scale:1},time,easing);
            }
            else {
               screens[next].element.removeClass('effects').children(':not(.dialog,.static)').css({x:0,y:0,opacity:1});
               screens[prev].element.removeClass('effects').children(':not(.dialog,.static)').css({x:0,y:0,opacity:1});
            }
            // screens[prev].element.find('.movable').removeClass('showed').addClass('hided');
            // screens[next].element.find('.movable').removeClass('hided').addClass('showed');
            // screens[prev].element.find('.movable').css('transform', 'translateX('+direction+600+'px)');
            // screens[next].element.css('display','block')
            // console.log(screens[next].element.find('.movable'));
            // screens[next].element.find('.movable').css('transform', 'translateX(-600px)').css('transform', 'translateX(0px)');
          } 
          var moveMovable = function (to) {
            var direction = to =='left';
          }
          var view = function(name, show, onfinish) {
              if (show) Console.info("Viewing screen "+name);
              else Console.info("Hiding screen "+name);
              var screen = screens[name];
              hided = !show;
              if (show) {
                screen.scope.show(onfinish);
                historyScreens.push(name);
                $scope.title = screen.attrs.title || "None";
              }
              else {
                screen.scope.hide(onfinish);
              }
              $scope.$apply();
              return screen
          }
          $scope.$root.hideScreen = function (onfinish) {
            view(historyScreens[historyScreens.length-1],false,onfinish);
          }
          $scope.$root.goScreen = function(name) {
            var lastScreen = historyScreens[historyScreens.length-1];
            var _onfinish = function() {view(name,true)};
            if (!hided) {
              if (lastScreen==name) return false;
              else if (lastScreen) {
                var screen = view(lastScreen,false,_onfinish);
                moveBackground(lastScreen,name);
              }
              else _onfinish();
            }
            else _onfinish();
            return true;
          }
          $scope.$root.backScreen = function() {
            var lastScreen = historyScreens.pop();
            var prevScreen = historyScreens[historyScreens.length-1]
            view(lastScreen,false,function() {
              var screen = view(prevScreen,true);
            });
            moveBackground(lastScreen,prevScreen,'left');
          }
          this.addScreen = function (scope,element, attrs) {
            var name = attrs.screenId;
            Console.info("Registered screen "+name,scope,attrs);
            
            screens[name] = {
              scope:scope,
              element:element,
              attrs:attrs,
            };
            if (attrs.hasOwnProperty('screenInit')) {
              $("#top-bar").one("animationend webkitAnimationEnd oanimationend MSAnimationEnd", function(e){
                $scope.goScreen(name);
              });
              // Console.log('******************************************',$scope.$root.effects, $scope.effects)
              if (!$scope.$root.effects) $("#top-bar").trigger('animationend');
            }
          }
        },
        template:
          '<div class="screens" ng-transclude>' +
          '</div>',
        replace: true
      };
    }

    Console.groupEnd();
    return directive;
});
