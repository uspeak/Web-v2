define(['Console'], function (Console) {
	"use strict";
	Console.group("Entering GameWords service module.");
	var service = function ($resource,$http) {
      var GameWordsService = $resource('http://v4.uspeakapp.com/userGames/getGameWords' +
          '/:lang_dir/:game.json',
          {}, {
            get:    {method:'GET', isArray:true} /* es un Array porque puede devolver más de una instancia de juego (para jugar Offline, por ejemplo.) */
          }
      );
      return GameWordsService;
	};
	Console.groupEnd();
	return service;
});
