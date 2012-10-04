define(['Console', 'lib/underscore/underscore-min'], function (Console) {
	Console.group("Entering Underscore module.");
	Console.info("Underscore: ", _);
	Console.groupEnd();
	return _;
});