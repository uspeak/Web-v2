// Generated by CoffeeScript 1.3.3
(function() {

  define(["Console"], function(Console) {
    "use strict";

    var service;
    Console.group("Entering DataService module.");
    service = function($resource) {
      return $resource("mock/data/:id.json", {}, {
        query: {
          method: "GET",
          params: {
            id: "list"
          },
          isArray: true
        }
      });
    };
    service.$inject = ["$resource"];
    Console.groupEnd();
    return service;
  });

}).call(this);
