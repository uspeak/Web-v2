define(['Console', 'libs/soundmanager2/soundmanager2-jsmin'], function (Console) {
	Console.group("Entering SoundManager module.");
	Console.info("SoundManager: ", SoundManager);
	soundManager = new SoundManager()
	Console.groupEnd();
	return soundManager;
});