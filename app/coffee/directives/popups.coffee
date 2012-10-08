define ["Console", "jQuery"], (Console, $) ->
  "use strict"
  Console.group "Entering popups directive module."
  Console.groupEnd()
  ->
    restrict: "E"
    transclude: true
    scope: true
    template: """<div class="popups" ng-class="{active:active}" ng-transclude></div>"""
    replace: true
    controller: ($scope, $element) ->
      popups = {}
      opened_popups = []
      $scope.$root.showPopup = (name) ->
        opened_popups.push(name)
        $scope.active = true
        popups[name].scope.active = true
        el = $(popups[name].element)
        el.show()
        if $scope.$root.effects
          el.keyframe "flipInPopup", 600
          
      hidePopup = ->
        Console.info "Hided Popup",opened_popups
        if not opened_popups.length
          $scope.active = false
          $scope.$apply()
          return
        last = opened_popups.pop()
        el = $(popups[last].element)
        f = ->
          el.hide()
          hidePopup()
        if $scope.$root.effects
          el.keyframe "flipOutPopup", 600, f
        else
          f()
      $scope.$root.hidePopup = ->
        hidePopup()

      @addPopup = (scope, element, attrs) ->
        name = attrs.popupId
        controller = element.controller()
        Console.info "Registered popup #{name}", scope, attrs, element, controller
        popups[name] =
          scope: scope
          controller: controller
          element: element
          attrs: attrs