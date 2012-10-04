// Generated by CoffeeScript 1.3.3
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["Console", "SoundManager", "jQuery"], function(Console, soundManager, $) {
    "use strict";

    var GameController;
    GameController = (function() {
      var timeout;

      function GameController(scope, element, attrs, GamesPlayed) {
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;
        this.GamesPlayed = GamesPlayed;
        this.id = this.attrs.gameId;
        this.name = this.attrs.gameTitle;
        this.description = this.attrs.gameDescription;
        this.initScope();
      }

      GameController.maxMistakes = 3;

      GameController.lifes = 3;

      GameController.prototype.mistakes = {};

      GameController.prototype.info = {};

      GameController.prototype.initScope = function() {};

      GameController.prototype.playAudio = function(sound_id) {
        if (__indexOf.call(soundManager.sounds, sound_id) >= 0 && this.$scope.$root.audio) {
          return soundManager.play(sound_id);
        }
      };

      GameController.prototype.addPoints = function(points) {
        return this.points += points;
      };

      GameController.prototype.pause = function() {
        Console.info('Pause');
        this.setStatus('paused');
        return this.clock.pause();
      };

      GameController.prototype.resume = function() {
        Console.info('Resume');
        this.setStatus(false);
        return this.clock.resume();
      };

      GameController.prototype.setStatus = function(status) {
        Console.info("Settings status " + status);
        this.scope.$root.gameStatus = status;
        this.scope.active = !status;
        return this.scope.$root.$apply();
      };

      GameController.prototype.preStart = function() {
        var interval, status,
          _this = this;
        status = ['ready', 'set', 'go'].reverse();
        this.setStatus(status.pop());
        return interval = setInterval(function() {
          if (!status.length) {
            _this.setStatus(false);
            _this.start();
            return clearInterval(interval);
          } else {
            return _this.setStatus(status.pop());
          }
        }, 1000);
      };

      GameController.prototype.initData = function(data) {
        this.data = data;
        Console.info('Init data', this.data);
        this.variation = parseInt(this.data.vid);
        this.time = this.data.time || this.data.seconds;
        this.scope.$root.totalRounds = this.totalRounds = this.data.W.length;
        this.scope.$root.gameTitle = this.name;
        return this.scope.$parent.gameVariation = this.variation;
      };

      GameController.prototype.play = function(data, onFinish, diagnostic) {
        this.onFinish = onFinish;
        this.diagnostic = diagnostic;
        Console.group("Game " + this.name);
        this.initData(data);
        return this.preStart();
      };

      GameController.prototype.unplay = function() {
        this.clock.pause();
        this.scope.active = false;
        return Console.groupEnd();
      };

      GameController.prototype.finish = function() {
        (this.onFinish || function() {})();
        return this.unplay();
      };

      GameController.prototype.timeout = function() {
        var timeout;
        Console.info("Timeout!");
        this.setStatus('timeout');
        return timeout = setTimeout(this.finish, 1000);
      };

      GameController.prototype.goRound = function(round) {
        this.round = round;
        Console.info("Round " + this.round + " of " + this.totalRounds);
        return this.scope.$root.round = this.round;
      };

      GameController.prototype.start = function() {
        var _this = this;
        Console.info('Start');
        this.scope.$root.gameRemainSeconds = this.time;
        this.clock = $('#game-clock').tzineClock(this.time, function() {
          return _this.timeout();
        }, function(seconds, total) {
          _this.scope.$root.gameRemainSeconds = total - seconds;
          return _this.scope.$root.$apply();
        });
        return this.goRound(0);
      };

      GameController.prototype.mistake = function() {
        var _base, _name, _ref;
        Console.info('Mistake');
        if ((_ref = (_base = this.mistakes)[_name = this.round]) == null) {
          _base[_name] = 0;
        }
        this.mistakes[this.round]++;
        if (this.mistakes[this.round] >= this.maxMistakes) {
          this.kill();
          return false;
        }
        return true;
      };

      GameController.prototype.kill = function() {
        Console.info('Kill life');
        this.scope.$root.lifes -= 1;
        this.scope.$root.$apply();
        if (this.scope.$root.lifes === 0) {
          return this.finish();
        } else {
          return this.nextRound();
        }
      };

      GameController.prototype.sendData = function() {
        return this.GamesPlayed.send(this, {});
      };

      timeout = null;

      GameController.prototype.nextRound = function() {
        var f,
          _this = this;
        if (timeout) {
          clearTimeout(timeout);
        }
        if (this.round < this.totalRounds - 1) {
          f = (function() {
            return _this.goRound(_this.round + 1);
          });
        } else {
          f = this.finish;
        }
        return timeout = setTimeout(f, 1000);
      };

      GameController.prototype.calcPoints = function(errors) {
        return 0;
      };

      return GameController;

    })();
    GameController.$inject = ['$scope', '$element', '$attrs', 'GamesPlayed'];
    return GameController;
  });

}).call(this);
