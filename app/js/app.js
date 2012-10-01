define([
	// Standard Libs
	'Console'		// lib/console/console
	, 'jQuery'		// lib/jquery/jquery
	, 'Underscore'	// lib/underscore/underscore
	, 'Angular'		// lib/angular/angular
	
	// Application Files
	, 'build/services/services'
	// , 'widgets/widgets'
	, 'order!directives/directives'
	, 'filters/filters'
	, 'build/controllers/controllers'	
], function (Console, $, _, angular, services, directives, filters, controllers) {
	"use strict";
	
	var initialize = function () {
		Console.group("Starting application.");
		// // Console.info("Services: ", services);
		// // Console.info("Widgets: ", widgets);
		// Console.info("Filters: ", filters);
		// Console.info("Controllers: ", controllers);
		
		// Console.group("Setup Angular");

		services();
		filters.initialize();
		directives.initialize();
		controllers();

		angular.module('uspeak', [
			'uspeak.filters',
			'uspeak.diagnostic.resources',
			'uspeak.directives',
			'uspeak.controllers'
		]);
			// config(function($provide) {
			// 	$provide.factory('user', function(User) {
			// 		Console.info('****************************************************');

			// 	})
			//					}).

		Console.info("Angular compiled and executed.");

		Console.groupEnd(); // [angular]
		Console.groupEnd(); // [bootstrap]
	};

	return { 
		initialize: initialize
	};
});