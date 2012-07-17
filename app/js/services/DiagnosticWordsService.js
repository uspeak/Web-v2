define(['Console'], function (Console) {
	"use strict";
	Console.group("Entering DiagnosticWords service module.");
	var service = function ($resource,$http) {
      var DiagnosticWordsService = $resource('http://v4.uspeakapp.com/diagnostics/getDiagnosticWordsBeta3' +
          '/:lang_dir/:profile.json',
          {}, {
            update: { method: 'PUT' },
            get:    {method:'GET'}
          }
      );
      return DiagnosticWordsService;
	};

	Console.groupEnd();
	return service;
});
