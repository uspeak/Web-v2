define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  Console.group "Entering game screens module."
  Console.groupEnd()

  ->
    restrict: "E"
    transclude: true
    # scope: true,
    controller: ($scope, $element) ->
      screens = $scope.screens = {}
      historyScreens = []
      hided = false
      moveBackground = (prev, next, to) ->
        direction = (if to is "left" then "+" else "-")
        trees_back = $("#game-background .trees-back")
        trees_front = $("#game-background .trees-front")
        trees_back.css "x", direction + "=200px"
        trees_front.css "x", direction + "=500px"
        if $scope.$root.effects
          x = (if to is "left" then 1000 else -1000)
          time = 1800
          easing = "cubic-bezier(0.530, 0.180, 0.425, 0.860)"
          screens[prev].element.removeClass("effects").children(":not(.dialog,.static)").css(transformOrigin: "bottom center").transit
            x: x
            opacity: .5
            scale: .8
          , time, easing
          screens[next].element.addClass("effects").children(":not(.dialog,.static)").css(
            x: -x
            opacity: .5
            scale: .8
            transformOrigin: "bottom center"
          ).transit
            x: 0
            opacity: 1
            scale: 1
          , time, easing
        else
          screens[next].element.removeClass("effects").children(":not(.dialog,.static)").css
            x: 0
            y: 0
            opacity: 1

          screens[prev].element.removeClass("effects").children(":not(.dialog,.static)").css
            x: 0
            y: 0
            opacity: 1

      moveMovable = (to) ->
        direction = to is "left"

      view = (name, show, onfinish) ->
        if show
          Console.info "Viewing screen " + name
        else
          Console.info "Hiding screen " + name
        screen = screens[name]
        hided = not show
        if show
          screen.scope.show onfinish
          historyScreens.push name
          $scope.title = screen.attrs.title or "None"
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

        moveBackground lastScreen, prevScreen, "left"

      @addScreen = (scope, element, attrs) ->
        name = attrs.screenId
        Console.info "Registered screen " + name, scope, attrs
        screens[name] =
          scope: scope
          element: element
          attrs: attrs

        if attrs.hasOwnProperty("screenInit")
          $("#top-bar").one "animationend webkitAnimationEnd oanimationend MSAnimationEnd", (e) ->
            $scope.goScreen name
          $("#top-bar").trigger "animationend"  unless $scope.$root.effects

    template: """<div class="screens" ng-transclude></div>"""
    replace: true
