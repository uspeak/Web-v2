define ["Console", "jQuery", "Underscore"], (Console, $, _) ->
  "use strict"
  Console.group "Entering AppController module."
  class AppController
    constructor: (@scope, @DiagnosticWordsService, @GamesService, @user, @games) ->
      @initScope()

    initScope: ->
      game = $("#game")
      __ = @
      
      @$root.audio = true
      @scope.toggleAudio = =>
        @$root.audio = not @$root.audio
      
      @scope.user = @user
      
      @scope.login = ->
        __.user.login @login_name, @login_pass,
          success: (data) =>
            __.scope.goScreen "user-home"
          error: (err) ->
            e.cssanimation "incorrect", 400
      
      @scope.toggleSettings = ->
        @scope.backScreen()  unless $scope.goScreen("settings")

      @scope.goGames = =>
        Console.group "User games"
        game.addClass "loading"
        Console.info "Loading"
        @GamesService.get
          lang_dir: LANG_DIR
        , (response) =>
          game.removeClass "loading"
          Console.info "Data loaded: ", response
          Console.groupEnd()
          @scope.gameList = _.map(response, (game) ->
            game.Game.type = games.id(parseInt(game.Game.id)).type
            game.Game
          )
          @scope.gameIndex = 0
          @scope.$apply()
          @scope.goScreen "user-games"


      @scope.register = ->
        form = $("#user-register")
        form.find(".error[name]").removeClass "error"
        user_errors = form.find(".error-messages span")
        user_errors.removeClass "visible"
        user.register
          username: @user_name or ""
          password: @user_pass or ""
          email: @user_email or ""
          profile: 3
          lang_dir: LANG_DIR
          points: 1000
        ,
          success: (data) ->
            __.scope.goScreen "user-home"

          error: (err) ->
            console.log err
            error = user_errors.filter("[data-error={0}]".format(err))
            field = form.find("[name=\"{0}\"]".format(error.data("error-field")))
            offset = field.position()
            error.css(
              top: offset.top + field.outerHeight(true) * 3 / 2 - error.height()
              left: offset.left + field.outerWidth(true)
            ).addClass "visible"
            field.addClass "error"
            console.log error, field


      @scope.login = ->
        user.login @login_name, @login_pass,
          success: (data) =>
            __.scope.goScreen "user-home"
          error: (err) ->
            e.cssanimation "incorrect", 400

      @scope.toggleAudio = ->
        @scope.$root.audio = not @scope.$root.audio

  AppController.$inject = ["$scope", "DiagnosticWordsService", "GamesService", "user", "games"]
  AppController

  controller = ($scope, DiagnosticWordsService, GamesService, user, games) ->
    gamehelpscreen = $("#game-help-screen")
    game = $("#game")
    selector = undefined
    diagnosticWords = game: []
    $scope.$root.audio = true
    $scope.user = user
    $scope.$root.lifes = false
    $scope.diagnostic =
      level: 0
      gameIndex: 0
      points: 0
      timeout: false
      finished: ->
        @gameIndex >= @gameTotal() or @timeout or $scope.$root.lifes is 0

      gameTotal: ->
        diagnosticWords.game.length

      gameData: ->
        return {}  if @finished() or not diagnosticWords.game.length
        diagnosticWords.game[@gameIndex]

      game: ->
        id = @gameData().gid
        games.id id if id

    $scope.support = effects: Modernizr.cssanimations and Modernizr.csstransitions
    $scope.$root.effects = EFFECTS and $scope.support.effects
    Console.info "Support", $scope.support
    $scope.showHelp = ->
      gamehelpscreen.click ->
        game.removeClass "help"

      game.addClass "help"
      if game.hasClass("play")
        selector = $("#game-header [data-help], #game .game.active [data-help]")
      else
        selector = $("#top-bar [data-help], #game .screen.active [data-help]")
      gamehelpscreen.empty()
      selector.each ->
        _this = $(this)
        helptext = _this.data("help")
        position = _this.offset()
        position_rel = game.offset()
        pos = $("<div class=\"help-position\"><span class=\"help-text\"/></div>")
        pos.children().text(helptext).addClass _this.data("help-position") or "tr"
        padding = 0
        
        # pos.hover(function(){_this.addClass('tada animated');},
        #  function(){_this.removeClass('tada animated');})
        left = position.left - position_rel.left - padding
        top = position.top - position_rel.top - padding
        width = _this.outerWidth()
        height = _this.outerHeight()
        pos.appendTo(gamehelpscreen).css
          left: left
          top: top
          width: width
          height: height
          padding: padding



    
    # console.log(_this.position());
    $scope.toggleSettings = ->
      $scope.backScreen()  unless $scope.goScreen("settings")

    $scope.loadDiagnostic = ->
      Console.group "Diagnostic"
      $scope.lifes = 3
      diagnostic_data =
        lang_dir: LANG_DIR
        profile: $scope.diagnostic.level + 1

      Console.info "Loading: ", diagnostic_data
      game.addClass "loading"
      DiagnosticWordsService.get diagnostic_data, (response) ->
        game.removeClass "loading"
        diagnosticWords = response
        Console.info "Data loaded: ", response
        Console.groupEnd()
        $scope.goScreen "diagnostic-games-intro"


    $scope.goGames = ->
      Console.group "User games"
      game.addClass "loading"
      Console.info "Loading"
      GamesService.get
        lang_dir: LANG_DIR
      , (response) ->
        game.removeClass "loading"
        Console.info "Data loaded: ", response
        Console.groupEnd()
        $scope.gameList = _.map(response.Games, (game) ->
          game.Game.type = games.id(parseInt(game.Game.id)).type
          game.Game
        )
        $scope.gameIndex = 0
        $scope.$apply()
        $scope.goScreen "user-games"


    $scope.register = ->
      $this = this
      form = $("#user-register")
      form.find(".error[name]").removeClass "error"
      user_errors = form.find(".error-messages span")
      user_errors.removeClass "visible"
      user.register
        username: @user_name or ""
        password: @user_pass or ""
        email: @user_email or ""
        profile: 3
        lang_dir: LANG_DIR
        points: 1000
      ,
        success: (data) ->
          $scope.goScreen "user-home"

        error: (err) ->
          console.log err
          error = user_errors.filter("[data-error={0}]".format(err))
          field = form.find("[name=\"{0}\"]".format(error.data("error-field")))
          offset = field.position()
          error.css(
            top: offset.top + field.outerHeight(true) * 3 / 2 - error.height()
            left: offset.left + field.outerWidth(true)
          ).addClass "visible"
          field.addClass "error"
          console.log error, field


    $scope.login = ->
      user.login @login_name, @login_pass,
        success: (data) ->
          $scope.goScreen "user-home"

        error: (err) ->
          e.cssanimation "incorrect", 400


    $scope.toggleAudio = ->
      $scope.$root.audio = not $scope.$root.audio

  controller.$inject = ["$scope", "DiagnosticWordsService", "GamesService", "user", "games"]

  controller
