define(['Console'], function (Console) {
	"use strict";
	Console.group("Entering Games service module.");
	var service = function ($resource,$http) {
      var GamesService = $resource('http://v4.uspeakapp.com/games/getGamesF' +
          '/:lang_dir.json',
          {}, {
            update: { method: 'PUT' },
            get:    {method:'GET', isArray:true}
          }
      );
      return GamesService;
	};

	Console.groupEnd();
	return service;
});
