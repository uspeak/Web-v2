define([
  // Standard Libs
  'Console'   // lib/console/console
  , 'jQuery'  // lib/underscore/underscore
  , 'Underscore'  // lib/underscore/underscore
  , 'controllers/games/SelectGenericController'
], function (Console, $, _, SelectGenericController) {
  "use strict";
  Console.group("Entering YayornayController module.");
    var controller = function($scope, $injector) {
      $injector.invoke(SelectGenericController, this, {$scope: $scope});
      var $this = this;

      this.total_options = 2;
      this.goRound = function(round) {
        var data_round = $this.data.W[round];
        var sound_id = $this.hash_sound.format(data_round.w);
        $this.playAudio(sound_id);
        Console.info('Data round',data_round)
        $this.scope.word = data_round.w;
        $this.scope.correct = data_round.m
        $this.scope.clicked = {};
        $this.scope.$apply();
      };
      this.scope.selectOption = function(option) {
        if (!option==this.correct && !this.clicked[option]) $this.wrong();

        $this.send_data[$this.round] = {
          id:$this.data.W[$this.round].id,
          ref: option==this.correct?1:2,
          choosen: option
        };

        this.clicked[option] = true;
        setTimeout(function() {$this.nextRound($this.errors()>=1)},720);
      };
    };
    controller.prototype = Object.build(SelectGenericController.prototype)
    controller.$inject = ['$scope','$injector'];
  //controller.$eager = true;

    Console.groupEnd();
    return controller;
});