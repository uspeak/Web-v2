define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  Console.group "Entering game screens module."
  Console.groupEnd()

  ->
    restrict: "E"
    transclude: true
    # scope: true,
    controller: ($scope, $element) ->
      styles_out = y:-50, opacity:0
      styles_in = y:0, opacity:1
      $('#top-bar').css(styles_out)
      screens = $scope.screens = {}
      historyScreens = []
      hided = false

      moveBackground = (prev, next, left) ->
        direction = (if left then "+" else "-")
        trees_back = $("#game-background .trees-back")
        trees_front = $("#game-background .trees-front")
        trees_back.css "x", direction + "=200px"
        trees_front.css "x", direction + "=500px"
        if $scope.$root.effects
          x = (if left then 1000 else -1000)
          time = 3000
          easing = "cubic-bezier(0.530, 0.180, 0.425, 0.860)"
          screens[prev].element.removeClass("effects").children(":not(.dialog,.static)").css(transformOrigin: "bottom center").transit
            x: x
            opacity: .5
            scale: .6
          , time, easing
          screens[next].element.addClass("effects").children(":not(.dialog,.static)").css(
            x: -x
            opacity: .5
            scale: .6
            transformOrigin: "bottom center"
          ).transit
            x: 0
            opacity: 1
            scale: 1
          , time, easing
        else
          showcss = 
            x: 0
            y: 0
            opacity: 1
          screens[next].element.removeClass("effects").children(":not(.dialog,.static)").css showcss
          screens[prev].element.removeClass("effects").children(":not(.dialog,.static)").css showcss

      view = (name, show, onfinish) ->
        if show
          Console.info "Viewing screen " + name
        else
          Console.info "Hiding screen " + name
        screen = screens[name]
        hided = not show
        if show
          if $scope.$root.effects
            $('#top-bar').css(styles_out).transit styles_in, 600, ->
              screen.scope.show onfinish
          else
            screen.scope.show onfinish
          historyScreens.push name
          $scope.title = screen.attrs.title or "None"
        else
          if $scope.$root.effects
            screen.scope.hide ->
              $('#top-bar').css(styles_in).transit styles_out, 600, onfinish
          else
            screen.scope.hide onfinish

        $scope.$apply()
        screen

      $scope.$root.hideScreen = (onfinish) ->
        view historyScreens[historyScreens.length - 1], false, onfinish

      $scope.$root.goScreen = (name) ->
        lastScreen = historyScreens[historyScreens.length - 1]
        _onfinish = ->
          view name, true

        unless hided
          if lastScreen is name
            return false
          else if lastScreen
            screen = view(lastScreen, false, _onfinish)
            moveBackground lastScreen, name
          else
            _onfinish()
        else
          _onfinish()
        true

      $scope.$root.backScreen = ->
        lastScreen = historyScreens.pop()
        prevScreen = historyScreens[historyScreens.length - 1]
        view lastScreen, false, ->
          screen = view(prevScreen, true)

        moveBackground lastScreen, prevScreen, true

      @addScreen = (scope, element, attrs) ->
        name = attrs.screenId
        Console.info "Registered screen " + name, scope, attrs
        screens[name] =
          scope: scope
          element: element
          attrs: attrs

        if not DEBUG
          showScreen = name=='home'
        else
          showScreen = attrs.hasOwnProperty("screenInit")
          
        if showScreen
          $("#game-background .sun").one "animationend webkitAnimationEnd oanimationend MSAnimationEnd", (e) ->
            $scope.goScreen name
          $("#game-background .sun").trigger "animationend"  unless $scope.$root.effects

    template: """<div class="screens" ng-transclude></div>"""
    replace: true
