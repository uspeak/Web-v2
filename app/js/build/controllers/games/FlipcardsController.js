// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["Console", "SoundManager", "jQuery", "Underscore", "build/controllers/games/GameController"], function(Console, soundManager, $, _, GameController) {
    "use strict";

    var FlipcardsController;
    return FlipcardsController = (function(_super) {
      var WOT, matches, roundCards;

      __extends(FlipcardsController, _super);

      FlipcardsController.maxErrors = 1000;

      roundCards = [6, 6, 6, 6, 6];

      matches = {};

      WOT = function(obj) {
        return obj.word || obj.translation;
      };

      function FlipcardsController() {
        var __;
        FlipcardsController.__super__.constructor.apply(this, arguments);
        __ = this;
        this.scope.selectCard = function(correct) {
          var _this = this;
          if (this.card.selected) {
            return;
          }
          this.card.selected = true;
          this.card.correct = undefined;
          if (__.selectedCard) {
            correct = __.selectedCard.id === this.card.id;
            Console.info((correct ? "Matched" : "Unmatched"), WOT(__.selectedCard), WOT(this.card));
            this.card.correct = __.selectedCard.correct = correct;
            if (correct) {
              matches[this.card.id] = true;
              __.selectedCard = false;
            } else {
              setTimeout((function() {
                _this.card.selected = false;
                __.selectedCard.selected = false;
                _this.$apply();
                return __.selectedCard = false;
              }), 300);
            }
            if (_.all(_.values(matches), _.identity)) {
              return __.nextRound();
            }
          } else {
            return __.selectedCard = this.card;
          }
        };
      }

      FlipcardsController.prototype.preloadAudio = function(data) {
        Console.info("Precarga de Audio iniciada");
        return _.each(data.W, function(round) {
          if (round.au) {
            return soundManager.createSound({
              url: round.au,
              autoLoad: true
            });
          }
        });
      };

      FlipcardsController.prototype.initData = function(data) {
        FlipcardsController.__super__.initData.call(this, data);
        return this.totalRounds = data.W.length / 6;
      };

      FlipcardsController.prototype.goRound = function(round) {
        var cards, data, inf, sup, wt, _i, _len;
        FlipcardsController.__super__.goRound.call(this, round);
        inf = _.reduce(roundCards.slice(0, round), (function(memo, num) {
          return memo + num;
        }), 0);
        sup = inf + roundCards[round];
        data = this.data.W.slice(inf, sup);
        cards = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          wt = data[_i];
          cards.push({
            word: wt.w,
            id: wt.id
          });
          if (this.variation === 2) {
            cards.push({
              img: wt.m,
              id: wt.id
            });
          } else {
            cards.push({
              word: wt.m,
              id: wt.id
            });
          }
          matches[wt.id] = false;
        }
        this.scope.cards = _.shuffle(cards);
        return this.scope.$apply();
      };

      FlipcardsController.prototype.calcPoints = function(errors) {
        return 0;
      };

      return FlipcardsController;

    })(GameController);
  });

}).call(this);
