define([
  // Standard Libs
  'Console'   // lib/console/console
  , 'SoundManager'
  ,'jQuery'
], function (Console, soundManager, $) {
  "use strict";
  Console.group("Entering GameController module.");
    var GameController = function ($scope, GamesPlayed) {
      this.scope = $scope;
      this.data = false;
      var $this = this;
      this.isDiagnostic = false;
      this.points = this.scope.$root.points = 0;
      this.round = 0;
      this.play_data = {};
      this.send_data = [];
      var deregisterRound = this.scope.$root.$watch('round',function (round) {
        if (!$this.data || round==undefined || !$scope.active) return;
        var total = $this.totalRounds();
        Console.info('Round {0}/{1}'.format(round+1,total));
        $this.round = round;
        $this.play_data[round] = {
          errors: 0,
          points: 0
        };
        $this.goRound(round);
      });
      this.wrong = function() {
        this.play_data[this.round].errors++;
      }
      this.playAudio = function (sound_id) {
        if (sound_id in soundManager.sounds && $scope.$root.audio) {
          soundManager.play(sound_id);
        }
      }
      this.addPoints = function(points) {
        if (points<0) points = 0;
        this.play_data[this.round].points += (points || 0);
        this.points += points;
        this.scope.$root.points = this.points;
        this.scope.$root.$apply();
      }
      this.errors = function() {return this.play_data[this.round].errors}
      this.kill = function() {

        //if (!$this.isDiagnostic) return;
        Console.info('Life less')
        //Console.info($this.scope,$this.scope.lifes)
        $this.scope.$root.lifes = $this.scope.$root.lifes-1;
        $this.scope.$root.$apply();
        if ($this.scope.$parent.$parent.lifes==0) {
          Console.info('No more lifes. Game over')
          $this.finish();
        }
        // else {
        //   $this.nextRound();
        // }
      }
      this.unplay = function () {
        this.clock.pause();
      }
      this.startData = function (data) {}
      this.getTime = function (data) {
        return ($this.data.time || $this.data.seconds);
      }
      this.start = function() {
        this.clock = $('#game-clock').tzineClock($this.getTime(),function() {
          Console.info('Timeout!')
          $this.scope.diagnostic.timeout = true;
          $this.finish();
        });

      }
      this.send = function() {
          GamesPlayed.send(this,{});
      }
      this.start = function() {
        var states = $('#game-pretexts').children(),
            states_progress = 0,
            state = states.first();
        state.addClass('visible');
        $this.scope.$parent.variation = $this.data.vid;
        var $state_interval = setInterval(function() {
          state.removeClass('visible');
          state = state.next();
          if(state.length == 0) {
            console.log('finish');
            $this.clock = $('#game-clock').tzineClock($this.getTime(),function() {
              Console.info('Timeout!')
              $this.scope.diagnostic.timeout = true;
              $this.finish();
            });
            $this.scope.$root.round = 0;
            $this.scope.$root.total_rounds = $this.totalRounds();
            $this.scope.$root.$digest();
            clearInterval($state_interval);
          }
          else {
            state.addClass('visible');
          }
        },1000);
        $state_interval.resume();
      }

      this.calculePoints = function(errors) {
        return 0;
      }
      this.totalRounds = function() { return $this.data.W.length; }
      this.nextRound = function (kill) {
        if (kill) {
          $this.kill();
        }
        else {
          $this.addPoints($this.calculePoints($this.errors()));
        }
        if ($this.scope.round>=$this.totalRounds()-1) {
          $this.finish();
          return;
        }
        $this.scope.$root.round =  $this.scope.round+1;
        $this.scope.$root.$digest();
      }
      this.finish = function() {
        this.clock.pause();
        this.send();
        this.onFinish(this.points);
      }
      this.pause = function() {
        this.clock.pause();
      }
      this.resume = function() {
        this.clock.resume();
      }
    }
    GameController.prototype.initialize = function(_data,onFinish,diagnostic) {
      Console.info('Initializing', _data)
      if (!diagnostic) this.scope.$root.lifes = 3;
      this.onFinish = onFinish || function() {};
      this.data = _data;
      this.startData(_data);
      this.isDiagnostic = diagnostic;
      this.start();
    }
    return GameController;
  Console.groupEnd();
});