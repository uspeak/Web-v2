// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console"], function(Console) {
    "use strict";

    var service;
    Console.group("Entering UserWordStatus service module.");
    service = function($resource, $http) {
      return $resource("" + API_BASE + "wordMasteryLevels/getUserWordStatus/:word.json", {}, {
        get: {
          method: "GET"
        }
      });
    };
    Console.groupEnd();
    return service;
  });

}).call(this);
