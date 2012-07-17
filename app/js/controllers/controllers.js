define([
	// Standard Libs
	'Console'		// lib/console/console

	// Application Controller
	, 'controllers/AppController' // Main Application Controller - contains routing logic
	, 'controllers/games/SelectGenericController' // Main Application Controller - contains routing logic
	, 'controllers/games/FatfingersController' // Main Application Controller - contains routing logic
	, 'controllers/games/FlipcardsController' // Main Application Controller - contains routing logic
	, 'controllers/games/YayornayController' // Main Application Controller - contains routing logic
], function (Console, app, selectGeneric, fatfingers, flipcards, yayornay){
	"use strict";
	Console.group("Entering controllers module.");
	Console.info("AppController", app);
	Console.info("SelectGenericController", selectGeneric);
	Console.info("FatfingersController", fatfingers);
	Console.info("FlipcardsController", flipcards);

    var initialize = function () {
		angular.module('uspeak.controllers',[]).
		  controller('App', app).
		  controller('Game-whichone', selectGeneric).
		  controller('Game-association', selectGeneric).
		  controller('Game-fatfingers', fatfingers).
		  controller('Game-flipcards', flipcards).
		  controller('Game-yayornay', yayornay)
		;
		Console.debug("Custom controllers initialized.");
	}
	
	Console.groupEnd();

	return { 
		initialize: initialize
	};
});