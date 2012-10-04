// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console", "jQuery", "Underscore"], function(Console, $, _) {
    "use strict";

    var AppController, controller;
    Console.group("Entering AppController module.");
    AppController = (function() {

      function AppController(scope, DiagnosticWordsService, GamesService, user, games) {
        this.scope = scope;
        this.DiagnosticWordsService = DiagnosticWordsService;
        this.GamesService = GamesService;
        this.user = user;
        this.games = games;
        this.initScope();
      }

      AppController.prototype.initScope = function() {
        var game, __,
          _this = this;
        game = $("#game");
        __ = this;
        this.$root.audio = true;
        this.scope.toggleAudio = function() {
          return _this.$root.audio = !_this.$root.audio;
        };
        this.scope.user = this.user;
        this.scope.login = function() {
          var _this = this;
          return __.user.login(this.login_name, this.login_pass, {
            success: function(data) {
              return __.scope.goScreen("user-home");
            },
            error: function(err) {
              return e.cssanimation("incorrect", 400);
            }
          });
        };
        this.scope.toggleSettings = function() {
          if (!$scope.goScreen("settings")) {
            return this.scope.backScreen();
          }
        };
        this.scope.goGames = function() {
          Console.group("User games");
          game.addClass("loading");
          Console.info("Loading");
          return _this.GamesService.get({
            lang_dir: LANG_DIR
          }, function(response) {
            game.removeClass("loading");
            Console.info("Data loaded: ", response);
            Console.groupEnd();
            _this.scope.gameList = _.map(response, function(game) {
              game.Game.type = games.id(parseInt(game.Game.id)).type;
              return game.Game;
            });
            _this.scope.gameIndex = 0;
            _this.scope.$apply();
            return _this.scope.goScreen("user-games");
          });
        };
        this.scope.register = function() {
          var form, user_errors;
          form = $("#user-register");
          form.find(".error[name]").removeClass("error");
          user_errors = form.find(".error-messages span");
          user_errors.removeClass("visible");
          return user.register({
            username: this.user_name || "",
            password: this.user_pass || "",
            email: this.user_email || "",
            profile: 3,
            lang_dir: LANG_DIR,
            points: 1000
          }, {
            success: function(data) {
              return __.scope.goScreen("user-home");
            },
            error: function(err) {
              var error, field, offset;
              console.log(err);
              error = user_errors.filter("[data-error={0}]".format(err));
              field = form.find("[name=\"{0}\"]".format(error.data("error-field")));
              offset = field.position();
              error.css({
                top: offset.top + field.outerHeight(true) * 3 / 2 - error.height(),
                left: offset.left + field.outerWidth(true)
              }).addClass("visible");
              field.addClass("error");
              return console.log(error, field);
            }
          });
        };
        this.scope.login = function() {
          var _this = this;
          return user.login(this.login_name, this.login_pass, {
            success: function(data) {
              return __.scope.goScreen("user-home");
            },
            error: function(err) {
              return e.cssanimation("incorrect", 400);
            }
          });
        };
        return this.scope.toggleAudio = function() {
          return this.scope.$root.audio = !this.scope.$root.audio;
        };
      };

      return AppController;

    })();
    AppController.$inject = ["$scope", "DiagnosticWordsService", "GamesService", "user", "games"];
    AppController;

    controller = function($scope, DiagnosticWordsService, GamesService, user, games) {
      var diagnosticWords, game, gamehelpscreen, selector;
      gamehelpscreen = $("#game-help-screen");
      game = $("#game");
      selector = void 0;
      diagnosticWords = {
        game: []
      };
      $scope.$root.audio = true;
      $scope.user = user;
      $scope.$root.lifes = false;
      $scope.diagnostic = {
        level: 0,
        gameIndex: 0,
        points: 0,
        timeout: false,
        finished: function() {
          return this.gameIndex >= this.gameTotal() || this.timeout || $scope.$root.lifes === 0;
        },
        gameTotal: function() {
          return diagnosticWords.game.length;
        },
        gameData: function() {
          if (this.finished() || !diagnosticWords.game.length) {
            return {};
          }
          return diagnosticWords.game[this.gameIndex];
        },
        game: function() {
          var id;
          id = this.gameData().gid;
          if (id) {
            return games.id(id);
          }
        }
      };
      $scope.support = {
        effects: Modernizr.cssanimations && Modernizr.csstransitions
      };
      $scope.$root.effects = EFFECTS && $scope.support.effects;
      Console.info("Support", $scope.support);
      $scope.showHelp = function() {
        gamehelpscreen.click(function() {
          return game.removeClass("help");
        });
        game.addClass("help");
        if (game.hasClass("play")) {
          selector = $("#game-header [data-help], #game .game.active [data-help]");
        } else {
          selector = $("#top-bar [data-help], #game .screen.active [data-help]");
        }
        gamehelpscreen.empty();
        return selector.each(function() {
          var height, helptext, left, padding, pos, position, position_rel, top, width, _this;
          _this = $(this);
          helptext = _this.data("help");
          position = _this.offset();
          position_rel = game.offset();
          pos = $("<div class=\"help-position\"><span class=\"help-text\"/></div>");
          pos.children().text(helptext).addClass(_this.data("help-position") || "tr");
          padding = 0;
          left = position.left - position_rel.left - padding;
          top = position.top - position_rel.top - padding;
          width = _this.outerWidth();
          height = _this.outerHeight();
          return pos.appendTo(gamehelpscreen).css({
            left: left,
            top: top,
            width: width,
            height: height,
            padding: padding
          });
        });
      };
      $scope.toggleSettings = function() {
        if (!$scope.goScreen("settings")) {
          return $scope.backScreen();
        }
      };
      $scope.loadDiagnostic = function() {
        var diagnostic_data;
        Console.group("Diagnostic");
        $scope.lifes = 3;
        diagnostic_data = {
          lang_dir: LANG_DIR,
          profile: $scope.diagnostic.level + 1
        };
        Console.info("Loading: ", diagnostic_data);
        game.addClass("loading");
        return DiagnosticWordsService.get(diagnostic_data, function(response) {
          game.removeClass("loading");
          diagnosticWords = response;
          Console.info("Data loaded: ", response);
          Console.groupEnd();
          return $scope.goScreen("diagnostic-games-intro");
        });
      };
      $scope.goGames = function() {
        Console.group("User games");
        game.addClass("loading");
        Console.info("Loading");
        return GamesService.get({
          lang_dir: LANG_DIR
        }, function(response) {
          game.removeClass("loading");
          Console.info("Data loaded: ", response);
          Console.groupEnd();
          $scope.gameList = _.map(response.Games, function(game) {
            game.Game.type = games.id(parseInt(game.Game.id)).type;
            return game.Game;
          });
          $scope.gameIndex = 0;
          $scope.$apply();
          return $scope.goScreen("user-games");
        });
      };
      $scope.register = function() {
        var $this, form, user_errors;
        $this = this;
        form = $("#user-register");
        form.find(".error[name]").removeClass("error");
        user_errors = form.find(".error-messages span");
        user_errors.removeClass("visible");
        return user.register({
          username: this.user_name || "",
          password: this.user_pass || "",
          email: this.user_email || "",
          profile: 3,
          lang_dir: LANG_DIR,
          points: 1000
        }, {
          success: function(data) {
            return $scope.goScreen("user-home");
          },
          error: function(err) {
            var error, field, offset;
            console.log(err);
            error = user_errors.filter("[data-error={0}]".format(err));
            field = form.find("[name=\"{0}\"]".format(error.data("error-field")));
            offset = field.position();
            error.css({
              top: offset.top + field.outerHeight(true) * 3 / 2 - error.height(),
              left: offset.left + field.outerWidth(true)
            }).addClass("visible");
            field.addClass("error");
            return console.log(error, field);
          }
        });
      };
      $scope.login = function() {
        return user.login(this.login_name, this.login_pass, {
          success: function(data) {
            return $scope.goScreen("user-home");
          },
          error: function(err) {
            return e.cssanimation("incorrect", 400);
          }
        });
      };
      return $scope.toggleAudio = function() {
        return $scope.$root.audio = !$scope.$root.audio;
      };
    };
    controller.$inject = ["$scope", "DiagnosticWordsService", "GamesService", "user", "games"];
    return controller;
  });

}).call(this);
