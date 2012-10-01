define ["Console", "Underscore"], (Console, _) ->
  "use strict"
  Console.group "Entering Games service module."
  service = ($resource, $http) ->
    GamesPlayed = $resource "#{ API_BASE }userGames/played.json", {},
      send:
        method: "POST"

    default_opts =
      error: ->

      success: ->

    $send = GamesPlayed.send
    GamesPlayed.send = (game, opts) ->
      send_data =
        idg: 1
        idv: game.data.vid
        pts: game.points
        instance: game.data.instance
        langdir: LANG_DIR
        W: game.send_data or []

      opts = _.extend {}, default_opts, opts
      $send send_data, (data) =>
        opts.success.call @, data  if isString(data.res)


    GamesPlayed

  Console.groupEnd()
  service
