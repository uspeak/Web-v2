define([
  'Console' // lib/console/console
  ,'jQuery' // lib/underscore/underscore
  ,'Underscore' // lib/underscore/underscore
  ,'controllers/games/GameController'
], function (Console, $, _, GameController) {
    "use strict";
    Console.group("Entering FatfingersController module.");
    var controller = function ($scope, $injector) {
            $injector.invoke(GameController, this, {
                $scope: $scope
            });
            var $this = this;
            var accent_table = {
                222: {
                    97: 225,
                    101: 233,
                    105: 237,
                    111: 243,
                    117: 250
                }
            };
            var last_key = undefined;
            //this.totalRounds = function() { return $this.data[117].length; }
            this.goRound = function (round) {
                var data_round = $this.data.W[round];
                //console.log('Data Round', data_round)
                angular.element('#game-fatfingers-letters li').removeClass('completed').find('b').css({
                    top: 0,
                    left: 0
                });
                angular.element('#game-fatfingers-placeholder li').removeClass('completed');
                //  angular.element('#game-fatfingers-placeholder li')
                $this.scope.word = data_round.m;
                $this.scope.translation = $.trim(data_round.w).split('');
                $this.scope.translation_shuffled = _.shuffle($this.scope.translation);
                $this.scope.$apply();
            };
            this.calculePoints = function (errors) {
                return 100 - 25 * errors; //+50
            };
            this.selectLetter = function (e) {
                if (!e.length) return;
                //Console.info('Selected Letter "{0}"'.format(e.text()));
                var lis = angular.element('#game-fatfingers-placeholder li:not(.completed)');
                if (e.hasClass('completed')) return;
                //console.log('putLetter',this,$event,e,lis.length,e.is('.completed'));
                var li = lis.eq(0);
                var correct = li.text() == e.text();
                if (correct) {
                    var e_offset = e.offset();
                    var p_offset = li.offset();
                    li.addClass('completed');
                    e.addClass('completed');
                    e.find('b').css({
                        top: p_offset.top - e_offset.top + 4,
                        left: p_offset.left - e_offset.left + 4
                    });
                    if (lis.length == 1) {
                        setTimeout(this.nextRound, 1000);
                        return;
                    }
                } else {
                    this.wrong();
                    if (this.errors() > 2) this.nextRound(true);
                    else e.cssanimation('incorrect', 400);
                }
            }
            $scope.$root.clickLetter = function ($event) {
                $this.selectLetter(angular.element($event.currentTarget));
            }
            $(document).keyup(function (e) {
                last_key = e.keyCode || e.charCode;
            });
            $(document).keypress(function (e) {
                var charcode = e.charCode;
                if (last_key in accent_table) charcode = accent_table[last_key][charcode]
                var ch = String.fromCharCode(charcode);
                //Console.info('Pressed key',ch,e,last_key)
                var elem = $('#game-fatfingers-letters li:not(.completed):contains("' + ch + '")').first();
                $this.selectLetter(elem);
            });
            //Console.info('init FatfingersController',$scope)
        };
    controller.prototype = Object.build(GameController.prototype)
    controller.$inject = ['$scope', '$injector'];
    Console.groupEnd();
    return controller;
});