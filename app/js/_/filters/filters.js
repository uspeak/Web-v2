define([
	// Standard Libs
	'Console'		// lib/console/console
	, 'jQuery'		// lib/jquery/jquery
	, 'Underscore'	// lib/underscore/underscore
	, 'Angular'		// lib/angular/angular

	// Application Filters

], function (Console, $, _, angular){
	"use strict";
	Console.group("Entering Filters module.");
	var initialize = function () {
		angular.module('uspeak.filters',[]).
		  filter('shuffle', asFunc(function(s) {
		  	if (s.substring) s = s.split('');
		  	return _.shuffle(s);
		  }));
		Console.debug("Custom filters initialized.");
	}

	Console.groupEnd();
	return { 
		initialize: initialize
	};
});
