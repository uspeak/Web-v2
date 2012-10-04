define([
    'Console'       // lib/console/console
    , 'jQuery'      // lib/jquery/jquery
], function (Console, $) {
  "use strict";
  Console.group("Entering games directive module.");

  var directive = function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: true,
        template:
          '<div class="games" ng-transclude>' +
          '</div>',
        replace: true,
        controller: function($scope, $element, GameWordsService, games) {
          var _games = games;
          var games = {};
          var game_active;
          var $game = $('#game');
          var play = function(gameId, gameData, onFinish, diagnostic) {
            angular.forEach(games, function(game,name) {
              game.scope.active = false;
            });
            var game = games[gameId];
            $scope.$root.hideScreen(function () {
              Console.group("Game {0}".format(gameId))
              $game.addClass('play');
              $scope.$parent.title = game.attrs.gameTitle;
              game.scope.active = true;
              game.scope.$apply();
              game_active = game;
              game.controller.play(gameData,onFinish,diagnostic);
            });
            
            return game;
          }
          var unplay = function () {
            Console.groupEnd();
            $game.removeClass('play');
            angular.forEach(games, function(game,name) {
              if (game.scope.active) {
                game.scope.active = false;
                game.controller.unplay();
              }
            });
            game_active = undefined;
          }
          $scope.resumeGame = function(gameId) {
            $scope.paused = false;
            game_active.controller.resume();
          }
          $scope.pauseGame = function() {
            $scope.paused = true;
            game_active.controller.pause();
          }
          $scope.$parent.exit = function() {
            if (game_active.controller.isDiagnostic) $scope.goScreen('diagnostic-games-intro');
            else $scope.goScreen('user-games');
            unplay();
          }
          $scope.$parent.playDiagnosticGame = function(gameId,gameData) {
            var game = play(gameId, gameData ,function() {
              Console.info('Finished game')
              $scope.diagnostic.gameIndex += 1;
              if ($scope.diagnostic.finished()) {
                $scope.goScreen('diagnostic-register');
              }
              else {
                $scope.goScreen('diagnostic-games-intro');
              }
              unplay();
            },true);
          }
          $scope.$parent.playGame = function(gameType) {
            $game.addClass('loading');
            var gameInfo = _games.type(gameType);
            Console.info('Loading game',gameInfo);
            GameWordsService.get({lang_dir:LANG_DIR,game:gameInfo.id},function(data) {
              $game.removeClass('loading');
              Console.info('Game loaded',data);
              var game = play(gameInfo.type, data[0] ,function() {
                Console.info('Finished game')
                $scope.goScreen('user-games');
                unplay();
              });
            });
          }
          $scope.$parent.gameDescription = function(name) {
            
            return name && games[name].attrs.gameDescription;
          }
          this.addGame = function (scope, element, attrs) {
            var name = attrs.gameId;
            var controller = element.controller();
            Console.info("Registered game {0}".format(name),scope,attrs,element, controller);

            games[name] = {
              scope:scope,
              controller:controller,
              element:element,
              attrs:attrs,
            };
          }
        },
      };
    }

  Console.groupEnd();
  return directive;
});