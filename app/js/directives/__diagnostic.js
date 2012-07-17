define([
    // Standard Libs
    'Console'       // lib/console/console
    , 'jQuery'      // lib/jquery/jquery
    , 'Underscore'  // lib/underscore/underscore
    , 'Angular'     // lib/angular/angular

    // Application Widgets

], function(Console, $, _, angular){
    "use strict";
    Console.group("Entering Widgets module.");

    var registeredWidgets = {};
    Console.info("Registered widgets: ", registeredWidgets);

    var initialize = function () {

        
          // config(function($provide, $compileProvider, $filterProvider) {
          //   $provide.value('$compileProvider', $compileProvider)
          //   // console.log($provide, $compileProvider, $filterProvider);
          // }).
          // run(function() {
          //   console.log('******************',this);
          // }).

          /*controller('prueba',function($scope) {
            console.log('**',gamesCtrl)
                  console.log(this);
                  this.clickedInCorrect = false;
                  this.data = {};
                  this.onFinish = function () {}
                  var $this = this;
                  $scope.initialize = function(_data,_onFinish) {
                      console.log('Initialize',_data,gameId);
                      $this.data = _data;
                      console.log(_data);
                      $scope.round = {actual:0,total:_data.W.length};
                      $this.goRound(0);
                      if (_onFinish) $this.onFinish = _onFinish;
                  }
                  this.goRound = function (round) {
                    console.log('Go round',this.data)
                    $this.clickedInCorrect = false;
                    if (!this.data) return;
                    else if (round>=this.data.W.length) {
                      onFinish();
                      return;
                    }
                    var data_round = this.data.W[round];
                    $scope.round.actual = round;
                    $scope.word = data_round.w;
                    console.log(gameId);
                    switch (gameId) {
                    default:
                    case 'whichone':
                      $scope.options = _.shuffle([{
                        word:data_round.d1,
                      },{
                        word:data_round.m,
                        correct:true,
                      }]);
                      break;
                    case 'association':
                      $scope.options = _.shuffle([{
                        word:data_round.d1,
                      },{
                        word:data_round.d2,
                      },{
                        word:data_round.d3,
                      },{
                        word:data_round.m,
                        correct:true,
                      }]);
                      break;
                    }
                    $scope.$apply();
                  }
                  this.onSelect = function(option) {
                    if (option.correct) {
                      this.goRound($scope.round.actual+1);
                    }
                  }
                  $scope.selectOption = function() {
                    console.log('Select option', this, $this.data);
                    if (!$this.clickedInCorrect) this.clicked = true;
                    var $$this = this;
                    setTimeout(function() {$this.onSelect($$this.option)},820);
                    $this.clickedInCorrect = this.option.correct;
                    //this.$apply();
                  }
          }).*/;
        Console.debug("Custom widgets initialized.");
    }

    Console.groupEnd();
    return { 
        initialize: initialize
    };
});
