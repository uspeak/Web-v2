// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console"], function(Console) {
    "use strict";

    var service;
    Console.group("Entering GameWords service module.");
    service = function($resource, $http) {
      return $resource("" + API_BASE + "userGames/getGameWords/:lang_dir/:game.json", {}, {
        get: {
          method: "GET",
          isArray: true
        }
      });
    };
    Console.groupEnd();
    return service;
  });

}).call(this);
