// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["Console", "SoundManager", "jQuery", "Underscore", "controllers/games/Game"], function(Console, soundManager, $, _, GameController) {
    "use strict";

    var FatfingersController;
    return FatfingersController = (function(_super) {
      var accentTable;

      __extends(FatfingersController, _super);

      FatfingersController.maxMistakes = 2;

      accentTable = {
        222: {
          97: 225,
          101: 233,
          105: 237,
          111: 243,
          117: 250
        }
      };

      FatfingersController.prototype.placeholderSelector = '#game-fatfingers-placeholder';

      FatfingersController.prototype.lettersSelector = '#game-fatfingers-letters';

      function FatfingersController() {
        var lastKey, selectLetter,
          _this = this;
        FatfingersController.__super__.constructor.apply(this, arguments);
        lastKey = null;
        selectLetter = function(e) {
          var correct, e_offset, li, lis, p_offset;
          if (!e.length || e.is('.completed')) {
            return;
          }
          _this.typedWord += e.text();
          lis = $("" + _this.placeholderSelector + " li:not(.completed)");
          li = lis.eq(0);
          if (correct = li.text() === e.text()) {
            e_offset = e.offset();
            p_offset = li.offset();
            li.addClass('completed');
            e.addClass('completed');
            e.find('b').css({
              top: p_offset.top - e_offset.top + 4,
              left: p_offset.left - e_offset.left + 4
            });
            if (lis.length === 1) {
              _this.addPoints(_this.roundPoints());
              _this.nextRound();
            }
          } else {
            _this.makeMistake();
            return e.keyframe('incorrect', 400);
          }
        };
        this.scope.$root.clickLetter = function(e) {
          return selectLetter($(e.currentTarget));
        };
        $(document).keyup(function(e) {
          var _ref;
          if (!((_ref = this.scope) != null ? _ref.active : void 0)) {
            return;
          }
          return lastKey = e.keyCode || e.charCode;
        }).keypress(function(e) {
          var ch, charcode, elem, _ref;
          if (!((_ref = _this.scope) != null ? _ref.active : void 0)) {
            return;
          }
          charcode = e.charCode;
          if (__indexOf.call(accentTable, lastKey) >= 0) {
            charcode = accentTable[lastKey][charcode];
          }
          ch = String.fromCharCode(charcode);
          Console.info("Pressed key " + ch);
          elem = $("" + _this.lettersSelector + " li:not(.completed):contains('" + ch + "')").first();
          return selectLetter(elem);
        });
      }

      FatfingersController.prototype.nextRound = function() {
        this.addInfo();
        return FatfingersController.__super__.nextRound.apply(this, arguments);
      };

      FatfingersController.prototype.initData = function(data) {
        FatfingersController.__super__.initData.call(this, data);
        return this.totalRounds = data.W.length;
      };

      FatfingersController.prototype.addInfo = function() {
        var d;
        d = this.data.W[this.round];
        this.info[this.round] = {
          id: d.id,
          ref: this.roundMistakes() + 1,
          mispeell: this.typedWord
        };
        return Console.info("Added info", this.info[this.round]);
      };

      FatfingersController.prototype.goRound = function(round) {
        var data, dist;
        FatfingersController.__super__.goRound.call(this, round);
        this.typedWord = "";
        data = this.data.W[round];
        $("" + this.lettersSelector + " li").removeClass('completed').find('b').css({
          top: 0,
          left: 0
        });
        $("" + this.placeholderSelector + " li").removeClass('completed');
        this.scope.word = data.m;
        this.scope.translation = $.trim(data.w).split('');
        dist = $.trim(data.dist || '').split('');
        this.scope.translation_shuffled = _.shuffle([].concat(this.scope.translation, dist));
        return this.scope.$apply();
      };

      FatfingersController.prototype.roundPoints = function() {
        var mistakes;
        mistakes = this.roundMistakes();
        return 100 - 25 * mistakes;
      };

      return FatfingersController;

    })(GameController);
  });

}).call(this);
