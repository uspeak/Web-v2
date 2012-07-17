"use strict";

loader.addModules(['Console','jQuery','jQuery-plugins','SoundManager','Underscore','WebFont','WebFont-fonts','app','Angular','DOM'])

require.config({
    paths: {
        Console: 'libs/console/console'
        , jQuery: 'libs/jquery/jquery'//'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min'
        , Underscore: 'libs/underscore/underscore'
        , WebFont: 'webfont'
        , Angular: 'libs/angular/angular'
        , SoundManager: 'libs/soundmanager2/soundmanager2'
    }
    , priority: [ 
        "Console"
        , "jQuery"
        , "Underscore"
        , "Angular" 
        , "WebFont" 
        , "SoundManager" 
    ]
    , waitSeconds: 40
    // , urlArgs: 'v='+DEBUG?Math.random():'2.0'
});

require([
    // Standard Libs
    'require'
    , 'Console'
    , 'jQuery'
    , 'Underscore'
    , 'Angular'
], function (require, Console, $, _, angular) {
    Console.group("Bootstrap dependencies loaded. Starting bootstrap.");
    Console.info("Console", Console);
    Console.info("jQuery", $);
    Console.info("Underscore: ", _);
    Console.info("Angular: ", angular);

    require(['app'], function (App) {
        loader.setLoaded('app');
        Console.group("Starting bootstrap.");
        Console.info("App: ", App);

        App.initialize();
        
        Console.groupEnd();
    });

    Console.groupEnd();
});
require(['jQuery'],function ($) {
    var game = $('#game');
    $(document).ready(function() {
        loader.setLoaded('DOM');
    })

    if (!DEBUG) {
        var bubbles = $('#game-loader-progress').children(),
            bubbles_progress = 0,
            bb = bubbles.first();

        var $id = setInterval(function() {
            bubbles_progress = (bubbles.index(bb)+1)/bubbles.length;
            if (bubbles_progress>loader.loaded()) return;
            loader.loaded()
            bb.addClass('ld');
            bb = bb.next();
            if(bb.length == 0) {
                clearInterval($id);
                setTimeout(function() {game.addClass('loaded');},600)
            }
        }, 120);
        require(['order!libs/plax'], function () {
            $(document).ready(function() {
                $('.js-plaxify').plaxify();
                $.plax.enable();
            });
        });
    }
    else {
        game.addClass('loaded');
    }
    require(['libs/jquery.transit','libs/jquery.cssanimation.min','libs/jquery.tzineClock'], function () {
        loader.setLoaded('jQuery-plugins');
    });
});
require(['SoundManager'],function (soundManager) {
    soundManager.setup({
        url: '/swf/',
        preferFlash: false,
        flashVersion: 8,
        allowScriptAccess: 'sameDomain',
        // useFlashBlock: false, 
        onready: function() {
            loader.setLoaded('SoundManager');
        },
        ontimeout: function() {
            loader.setLoaded('SoundManager');
        }
    });
    soundManager.beginDelayedInit();
});

require(['WebFont'],function (WebFont) {
    WebFont.load({
      google: {
        families: ['Lato:400,900', 'Delius', 'Paytone One', 'Lobster' ] 
      },
      typekit: {
        id: 'geg8tlg'
      },
      active: function() {
        loader.setLoaded('WebFont-fonts');
      },
      inactive: function() {
        loader.setLoaded('WebFont-fonts');
      }
    });
});

var loader_modules = ['Console','jQuery','Underscore','WebFont','Angular'];
var module;
for(var i in loader_modules) {
    module = loader_modules[i];
    (function (mod) {
        require([mod],function() {
            loader.setLoaded(mod);
        });
    })(module)
}