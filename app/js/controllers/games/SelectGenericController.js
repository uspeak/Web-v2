define([
  // Standard Libs
  'Console'   // lib/console/console
  , 'jQuery'  // lib/underscore/underscore
  , 'Underscore'  // lib/underscore/underscore
  , 'SoundManager'
  , 'controllers/games/GameController'
], function (Console, $, _, soundManager, GameController) {
  "use strict";
  Console.group("Entering WhichoneController module.");
    var controller = function($scope, $injector) {
      $injector.invoke(GameController, this, {$scope: $scope});
      var $this = this;
      this.hash_sound = 'word-{0}';
      this.goRound = function(round) {
        $this.clickedInCorrect = false;
        var data_round = $this.data.W[round];
        var sound_id = $this.hash_sound.format(data_round.w);
        $this.playAudio(sound_id);
        Console.info('Data round',data_round)
        $this.scope.word = data_round.w;
        var options = [];
        _.each(data_round.dist,function(word) {options.push({word:word})});
        options.push({word:data_round.m,correct:true});
        $this.scope.options = _.shuffle(options);
        $this.total_options = options.length;
        $this.scope.$apply();
      };
      var preloadAudio = function(data) {
        Console.info('Haciendo precarga de audio')
        _.each(data.W,function(data_round) {
          var sound_id = $this.hash_sound.format(data_round.w);
          if (data_round.au) {
            Console.info('Cargando pista de audio',sound_id,data_round.au)
            soundManager.createSound({
              id:sound_id,
              url:data_round.au,
              autoLoad: true
            });
          }
        });
      }

      this.startData = function (data) {
        preloadAudio(data)
      }
      this.maxErrors = function() {
        return $this.total_options/2;
      }
      this.scope.selectOption = function(correct) {
        if (correct===undefined) correct = this.option.correct;
        if (!correct && !this.clicked) $this.wrong();
        if (!$this.clickedInCorrect) this.clicked = true;
        $this.clickedInCorrect = correct;
        $this.send_data[$this.round] = $this.send_data[$this.round] || {
          id:$this.data.W[$this.round].id,
          choosen:[],
        };
        $this.send_data[$this.round].ref = correct?1:2;
        $this.send_data[$this.round].choosen.push(this.option.word);
        $this.send_data[$this.round].errors = $this.errors();
        var kill = ($this.errors()>=$this.maxErrors());
        if (correct || kill) {
          setTimeout(function() {$this.nextRound(kill)},720);
        }
        //this.scope.apply();
      };
      this.calculePoints = function(errors) {
        return ($this.total_options-errors*2)*25;
      };
    };
    controller.prototype = Object.build(GameController.prototype)
    controller.$inject = ['$scope','$injector'];
  //controller.$eager = true;

    Console.groupEnd();
    return controller;
});