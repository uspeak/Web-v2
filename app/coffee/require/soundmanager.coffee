define ["Console", "lib/soundmanager2/soundmanager2-jsmin"], (Console) ->
  Console.group "Entering SoundManager module."
  Console.info "SoundManager: ", SoundManager
  soundManager = new SoundManager()
  Console.groupEnd()
  soundManager
