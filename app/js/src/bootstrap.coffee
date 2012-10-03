"use strict"
loader.addModules ["Console", "jQuery", "jQuery-plugins", "SoundManager", "Underscore", "WebFont", "WebFont-fonts", "app", "Angular", "DOM"]
require.config
  paths:
    Console: "../libs/console/console"
    jQuery: "../libs/jquery/jquery" #'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min'
    Underscore: "../libs/underscore/underscore"
    WebFont: "webfont"
    Angular: "../libs/angular/angular"
    SoundManager: "../libs/soundmanager2/soundmanager2"

  priority: ["Console", "jQuery", "Underscore", "Angular", "WebFont", "SoundManager"]
  waitSeconds: 40
  urlArgs: 'v='+(Math.random() if DEBUG else '2.0')

# Standard Libs
require ["require", "Console", "jQuery", "Underscore", "Angular"], (require, Console, $, _, angular) ->
  Console.group "Bootstrap dependencies loaded. Starting bootstrap."
  Console.info "Console", Console
  Console.info "jQuery", $
  Console.info "Underscore: ", _
  Console.info "Angular: ", angular
  require ["build/app"], (App) ->
    loader.setLoaded "app"
    Console.group "Starting bootstrap."
    Console.info "App: ", App
    App()
    Console.groupEnd()

  Console.groupEnd()

require ["jQuery"], ($) ->
  game = $("#game")
  $(document).ready ->
    loader.setLoaded "DOM"

  unless DEBUG
    bubbles = $("#game-loader-progress").children()
    bubbles_progress = 0
    bb = bubbles.first()
    $id = setInterval(->
      bubbles_progress = (bubbles.index(bb) + 1) / bubbles.length
      return  if bubbles_progress > loader.loaded()
      loader.loaded()
      bb.addClass "ld"
      bb = bb.next()
      if bb.length is 0
        clearInterval $id
        setTimeout (->
          game.addClass "loaded"
        ), 600
    , 120)
  
  else
    game.addClass "loaded"
  require ["libs/jquery.transit", "libs/jquery.keyframe", "libs/jquery.cssanimation.min", "libs/jquery.tzineClock"], ->
    loader.setLoaded "jQuery-plugins"


require ["SoundManager"], (soundManager) ->
  soundManager.setup
    url: "/swf/"
    preferFlash: false
    flashVersion: 8
    allowScriptAccess: "sameDomain"
    
    # useFlashBlock: false, 
    onready: ->
      loader.setLoaded "SoundManager"

    ontimeout: ->
      loader.setLoaded "SoundManager"

  soundManager.beginDelayedInit()

require ["WebFont"], (WebFont) ->
  WebFont.load
    google:
      families: ["Lato:400,900", "Delius", "Paytone One", "Lobster"]

    typekit:
      id: "geg8tlg"

    active: ->
      loader.setLoaded "WebFont-fonts"

    inactive: ->
      loader.setLoaded "WebFont-fonts"


loader_modules = ["Console", "jQuery", "Underscore", "WebFont", "Angular"]
module = undefined
for i of loader_modules
  module = loader_modules[i]
  ((mod) ->
    require [mod], ->
      loader.setLoaded mod

  ) module