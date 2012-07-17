define([
    // Standard Libs
    'Console'       // lib/console/console
    , 'Underscore'  // lib/underscore/underscore

    // Custom Services
    , 'services/DiagnosticWordsService'
    , 'services/UserService'
    , 'services/GameWordsService'
], function(Console, _ , dws, us, gws){
    "use strict";
    Console.group("Entering Service module.");
    Console.info("DiagnosticWordsService", dws);

    var initialize = function () {
        angular.module('uspeak.diagnostic.resources', ['ngResource']).
            factory('DiagnosticWordsService', dws).
            factory('GameWordsService', gws).
            factory('UserService', us).
            factory('user',function(UserService){
                var user = new UserService();
                if (DEBUG) user.setToken('testuser');
                return user;
            }).
            factory('games',function() {
                var games = [
                    {
                        id:1,
                        type:'flipcards',
                        variations:[1,2,21,22]
                    },
                    {
                        id:2,
                        type:'fatfingers',
                        variations:[1,2,7,21,22]
                    },
                    {
                        id:3,
                        type:'whichone',
                        variations:[1,2,7,21,22]
                    },
                    {
                        id:4,
                        type:'yayornay', 
                        variations:[12,13,14,15,16,17,18,28,29,30,31] //7,
                    },
                    {
                        id:5,
                        type:'braintickle',
                        variations:[3,12,13,14,15,16,17,18,23,25]
                    },
                    {
                        id:6,
                        type:'association',
                        variations:[1,2,7,9,10]
                    }
                ];
                return new (function() {
                    this.get = function(key,value) {
                        return _.find(games,function(obj) {return obj[key]==value}) || {};
                    };
                    this.id = function(value) {return this.get('id',value);};
                    this.type = function(value) {return this.get('type',value);};
                })();
            });
        Console.debug("Custom services initialized.");
    }

    Console.groupEnd();
    return { 
        initialize: initialize
    };
});
