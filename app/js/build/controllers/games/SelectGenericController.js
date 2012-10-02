// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["Console", "SoundManager", "jQuery", "Underscore", "build/controllers/games/GameController"], function(Console, soundManager, $, _, GameController) {
    "use strict";

    var SelectGenericController;
    return SelectGenericController = (function(_super) {

      __extends(SelectGenericController, _super);

      function SelectGenericController() {
        return SelectGenericController.__super__.constructor.apply(this, arguments);
      }

      SelectGenericController.prototype.initScope = function() {
        var __;
        __ = this;
        return this.scope.selectOption = function(correct) {
          var continue_, _ref;
          if (correct == null) {
            correct = this.option.correct;
          }
          continue_ = false;
          if (!correct && !this.clicked) {
            continue_ = __.mistake();
          }
          if (continue_) {
            if ((_ref = this.clicked) == null) {
              this.clicked = !__.clickedCorrect;
            }
          }
          if (correct) {
            __.nextRound();
          }
          return __.clickedCorrect = correct;
        };
      };

      SelectGenericController.prototype.preloadAudio = function(data) {
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

      SelectGenericController.prototype.initData = function(data) {
        var _ref;
        SelectGenericController.__super__.initData.call(this, data);
        this.numOptions = (((_ref = data.W[0].dist) != null ? _ref.length : void 0) || 1) + 1;
        this.maxMistakes = this.numOptions / 2;
        this.preloadAudio(data);
        return this.totalRounds = data.W.length;
      };

      SelectGenericController.prototype.initDataRound = function(data) {
        var options;
        options = _.map(data.dist, function(word) {
          return {
            word: word
          };
        });
        options.push({
          word: data.m,
          correct: true
        });
        this.scope.word = data.w;
        this.scope.options = _.shuffle(options);
        return this.scope.$apply();
      };

      SelectGenericController.prototype.goRound = function(round) {
        SelectGenericController.__super__.goRound.call(this, round);
        this.clickedCorrect = false;
        return this.initDataRound(this.data.W[round]);
      };

      SelectGenericController.prototype.calcPoints = function(errors) {
        return (this.numOptions - errors * 2) * 25;
      };

      return SelectGenericController;

    })(GameController);
  });

}).call(this);