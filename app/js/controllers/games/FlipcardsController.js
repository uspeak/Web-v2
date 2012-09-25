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
    var controller = function($scope, $injector, GameWordsService) {
      $injector.invoke(GameController, this, {$scope: $scope});
      var $this = this;
      var hash_sound = 'word-{0}';
      var hash_match = '{0}_{1}';
      var cards;
      var matches;
      //var round_cards = [3,6,9,12];
      var round_cards = [6,6,6,6,6];
      var data_round;
      var matches_count;
      if (DEBUG && $scope.$parent.active) {
        GameWordsService.get({lang_dir:1,game:1},function(d) {
          $this.initialize(d[0]);
          console.log('************',$scope,d)
        });
      }
      this.goRound = function(round) {
        var inf = _.reduce(round_cards.slice(0,round), function(memo, num){ return memo + num; }, 0);
        var sup = inf+round_cards[round];
        matches_count = 0;
        data_round = $this.data.W.slice(inf,sup);
        cards = [];
        matches = {};
        var key;
        _.each(data_round,function(wt) {
          cards.push({word:wt.w,id:wt.id});
          cards.push({translation:wt.m,id:wt.id});
          matches[wt.id] = false;
        });
        $this.scope.cards = _.shuffle(cards);
        $this.scope.$apply();
      };
      var wordOrTranslation = function(obj) {return obj.word || obj.translation};
      this.scope.selectCard = function() {
        if (this.card.selected) return;
        this.card.selected = true;
        this.card.correct = undefined;
        if ($this.selected_card) {
          var correct = $this.selected_card.id == this.card.id;
          Console.info(correct?'Matched':'Unmatched',wordOrTranslation($this.selected_card) , wordOrTranslation(this.card));
          this.card.correct = $this.selected_card.correct = correct;
          if (correct) {
            matches[this.card.id] = true;
            $this.selected_card = false;
          }
          else {
            var $$ = this;
            setTimeout(function() { $$.card.selected = false; $this.selected_card.selected = false; $scope.$apply();$this.selected_card = false; }, 300)
          }
          if (_.all(_.values(matches),_.identity)) setTimeout($this.nextRound,1000);
        }
        else $this.selected_card = this.card;
      };
      this.calculePoints = function(errors) {
        return 0;
        return (cards.length-errors*2)*25;
      };
      this.totalRounds = function() { return 5; }
    };
    controller.prototype = Object.build(GameController.prototype)
    controller.$inject = ['$scope','$injector','GameWordsService'];
  //controller.$eager = true;

    Console.groupEnd();
    return controller;
});