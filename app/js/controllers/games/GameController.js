define([
  // Standard Libs
  'Console'   // lib/console/console
  , 'SoundManager'
  ,'jQuery'
], function (Console, soundManager, $) {
  "use strict";
  Console.group("Entering GameController module.");
    var GameController = function ($scope) {
      this.scope = $scope;
      this.data = false;
      var $this = this;
      this.isDiagnostic = false;
      this.points = this.scope.$root.points = 0;
      this.round = 0;
      this.play_data = {};
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
      this._onFinish = function() {};
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
        if (!$this.isDiagnostic) return;
        Console.info('Life less')
        $this.scope.diagnostic.lifes = $this.scope.diagnostic.lifes-1;
        $this.scope.$apply();
        if ($this.scope.diagnostic.lifes==0) {
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
        this._onFinish(this.points);
      }
      this.pause = function() {
        this.clock.pause();
      }
      this.resume = function() {
        this.clock.resume();
      }
    }
    GameController.prototype.initialize = function(_data,_onFinish,diagnostic) {
      Console.info('Initializing', _data)
      this.data = _data;
      this.startData(_data);
      this.isDiagnostic = diagnostic;
      this.start();
      this.scope.$root.round = 0; //DEBUG?this.totalRounds()-4:0;
      this.scope.$root.total_rounds = this.totalRounds();
      this.scope.$root.$digest();
      if (_onFinish) this._onFinish = _onFinish;
    }
    return GameController;
  Console.groupEnd();
});