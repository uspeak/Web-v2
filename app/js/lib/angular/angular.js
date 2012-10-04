define(['Console', 'order!http://ajax.googleapis.com/ajax/libs/angularjs/1.0.2/angular.min.js', 'order!http://code.angularjs.org/1.0.2/angular-resource.min.js'], function (Console) {
//'order!libs/angular/angular-ie-compat',
	Console.group("Entering Angular module.");
	Console.info("Angular: ", angular);

	if (typeof _ != 'undefined') {
		_.noConflict() && Console.debug("_.noConflict()");
	}

	if(typeof $ != 'undefined') {
		$.noConflict() && Console.debug("$.noConflict()");
	}
	Console.debug("Global names removed.");

	Console.groupEnd();
	return angular;
});