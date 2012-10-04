define([
// Standard Libs
'Console', // lib/console/console
'jQuery', // lib/underscore/underscore
'Underscore' // lib/underscore/underscore
], function (Console, $, _) {
    "use strict";
    Console.group("Entering AppController module.");

    var controller = function ($scope, DiagnosticWordsService, GamesService, user, games) {
        Console.group("AppController entered");
        var gamehelpscreen = $('#game-help-screen'),
            game = $('#game'),
            selector,
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
            finished: function () {
                return this.gameIndex >= this.gameTotal() || this.timeout || $scope.$root.lifes === 0;
            },
            gameTotal: function () {
                return diagnosticWords.game.length;
            },
            data: function () {
                if (this.finished()) return {};
                return diagnosticWords.game[this.gameIndex]
            },
            game: function () {
                var id = this.data().gid;
                return games.id(id)
            }
        };

        $scope.support = {
            effects: Modernizr.cssanimations && Modernizr.csstransitions
        }

        $scope.$root.effects = EFFECTS && $scope.support.effects;
        Console.info('Support', $scope.support);

        $scope.showHelp = function () {
            gamehelpscreen.click(function () {
                game.removeClass('help');
            });
            game.addClass('help');
            if (game.hasClass('play')) {
                selector = $('#game-header [data-help], #game .game.active [data-help]');
            } else {
                selector = $('#top-bar [data-help], #game .screen.active [data-help]');
            }
            gamehelpscreen.empty();
            selector.each(function () {
                var _this = $(this);
                var helptext = _this.data('help');
                var position = _this.offset()
                var position_rel = game.offset()
                var pos = $('<div class="help-position"><span class="help-text"/></div>');
                pos.children().text(helptext).addClass(_this.data('help-position') || 'tr');
                var padding = 0;
                // pos.hover(function(){_this.addClass('tada animated');},
                //  function(){_this.removeClass('tada animated');})
                var left = position.left - position_rel.left - padding,
                    top = position.top - position_rel.top - padding,
                    width = _this.outerWidth(),
                    height = _this.outerHeight();
                pos.appendTo(gamehelpscreen).css({
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                    padding: padding
                });
                // console.log(_this.position());
            });
        }
        $scope.toggleSettings = function () {
            if (!$scope.goScreen('settings')) $scope.backScreen();
        }
        $scope.loadDiagnostic = function () {
            Console.group("Diagnostic");
            $scope.lifes = 3;
            var diagnostic_data = {
                lang_dir: LANG_DIR,
                profile: $scope.diagnostic.level + 1
            };
            Console.info("Loading: ", diagnostic_data);
            game.addClass('loading');
            DiagnosticWordsService.get(diagnostic_data, function (response) {
                game.removeClass('loading');
                diagnosticWords = response;
                Console.info("Data loaded: ", response);
                Console.groupEnd();
                $scope.goScreen('diagnostic-games-intro');
            });
        }
        $scope.goGames = function () {
            Console.group("User games");

            game.addClass('loading');
            Console.info("Loading");
            GamesService.get({
                lang_dir: LANG_DIR
            }, function (response) {
                game.removeClass('loading');
                Console.info("Data loaded: ", response);
                Console.groupEnd();
                $scope.gameList = _.map(response.Games, function (game) {
                    game.Game.type = games.id(parseInt(game.Game.id)).type;
                    return game.Game
                });
                $scope.gameIndex = 0;
                $scope.$apply();
                $scope.goScreen('user-games');
            });
        };
        $scope.register = function () {
            var $this = this;
            var form = $('#user-register');
            form.find('.error[name]').removeClass('error')
            var user_errors = form.find('.error-messages span');
            user_errors.removeClass('visible');

            user.register({
                username: this.user_name || "",
                password: this.user_pass || "",
                email: this.user_email || "",
                profile: 3,
                lang_dir: LANG_DIR,
                points: 1000
            }, {
                success: function (data) {
                    $scope.goScreen('user-home');
                },
                error: function (err) {
                    console.log(err);
                    var error = user_errors.filter('[data-error={0}]'.format(err));
                    var field = form.find('[name="{0}"]'.format(error.data('error-field')));
                    var offset = field.position();
                    error.css({
                        top: offset.top + field.outerHeight(true) * 3 / 2 - error.height(),
                        left: offset.left + field.outerWidth(true)
                    }).addClass('visible');
                    field.addClass('error');
                    console.log(error, field);
                }
            });
        }
        $scope.login = function () {
            user.login(this.login_name, this.login_pass, {
                success: function (data) {
                    $scope.goScreen('user-home');
                },
                error: function (err) {
                    e.cssanimation('incorrect', 400);
                }
            });
        };
        $scope.toggleAudio = function () {
            $scope.$root.audio = !$scope.$root.audio;
        }
    };
    controller.$inject = ['$scope', 'DiagnosticWordsService', 'GamesService', 'user', 'games'];
    //controller.$eager = true;

    Console.groupEnd();
    return controller;
});