define(['Console', 'order!http://code.angularjs.org/angular-1.0.1.min.js', 'order!http://code.angularjs.org/angular-resource-1.0.1.min.js'], function (Console) {
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