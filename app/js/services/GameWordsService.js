define(['Console'], function (Console) {
	"use strict";
	Console.group("Entering GameWords service module.");
	var service = function ($resource,$http) {
      var GameWordsService = $resource('http://v4.uspeakapp.com/games/getGamesWordsF2' +
          '/:lang_dir/:game/:variation.json',
          { variation: '1' }, {
            get:    {method:'GET', isArray:true} /* es un Array porque puede devolver más de una instancia de juego (para jugar Offline, por ejemplo.) */
          }
      );
      return GameWordsService;
	};

	Console.groupEnd();
	return service;
});
