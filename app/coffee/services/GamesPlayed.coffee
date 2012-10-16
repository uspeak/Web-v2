define ["Console", "Underscore"], (Console, _) ->
  "use strict"
  Console.group "Entering Games service module."
  service = ($resource, $http) ->
    GamesPlayed = $resource "#{ API_BASE }userGames/played.json", {},
      send:
        method: "POST"

    $send = GamesPlayed.send
    GamesPlayed.send = (game, success, error) ->
      send_data =
        idg: 1
        idv: game.data.vid
        pts: game.points
        instance: game.data.instance
        langdir: LANG_DIR
        W: game.info or []

      $send send_data, (data) =>
        if isString(data.res)
          success?.call @, data
        else
          error?.call @, data

    GamesPlayed

  Console.groupEnd()
  service
