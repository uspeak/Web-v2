// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["Console", "SoundManager", "jQuery", "controllers/games/SelectGenericController"], function(Console, soundManager, $, SelectGenericController) {
    "use strict";

    var YayornayController;
    return YayornayController = (function(_super) {

      __extends(YayornayController, _super);

      function YayornayController() {
        return YayornayController.__super__.constructor.apply(this, arguments);
      }

      YayornayController.maxMistakes = 1;

      YayornayController.prototype.initScope = function() {
        var __;
        __ = this;
        return this.scope.selectOption = function(option) {
          var correct, _base, _ref;
          correct = option === this.correct;
          if (!correct && !this.clicked[option]) {
            __.mistake();
          }
          if ((_ref = (_base = this.clicked)[option]) == null) {
            _base[option] = !__.clickedCorrect;
          }
          if (correct) {
            __.nextRound();
          }
          return __.clickedCorrect = correct;
        };
      };

      YayornayController.prototype.initDataRound = function(data) {
        this.scope.word = data.w;
        this.scope.correct = data.m;
        this.scope.clicked = {};
        return this.scope.$apply();
      };

      return YayornayController;

    })(SelectGenericController);
  });

}).call(this);
