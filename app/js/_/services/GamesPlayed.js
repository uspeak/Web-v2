define(['Console','Underscore'], function (Console,_) {
	"use strict";
	Console.group("Entering Games service module.");
	var service = function ($resource,$http) {
      var GamesPlayed = $resource('http://v4.uspeakapp.com/userGames/' +
          'played.json',
          {}, {
            send:   {method:'POST'},
          }
      );
      var default_opts = {
          error: function() {},
          success: function() {}
      }
      var $send = GamesPlayed.send;
      GamesPlayed.send = function (game,opts) 
      {
          var send_data = {
            idg: 1,//game.data.
            idv: game.data.vid,
            pts: game.points,
            instance: game.data.instance,
            langdir:LANG_DIR,
            W: game.send_data || []
          };
          opts = _.extend({},default_opts,opts)
          $send(send_data,function(data) {
              if (!isString(data.res)) opts.error.call($this, data.res, data);
              else {
                  opts.success.call($this, data);
              }
          })
      }
      return GamesPlayed;
	};

	Console.groupEnd();
	return service;
});
