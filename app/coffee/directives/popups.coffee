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
        if opened_popups.length
          last = opened_popups[opened_popups.length-1]
          last_popup = popups[last]
          last_popup.scope.active = false
          $(last_popup.element).hide()
        $scope.active = true
        popups[name].scope.active = true
        el = $(popups[name].element)
        el.show()
        if $scope.$root.effects
          el.keyframe "flipInPopup", 600

        opened_popups.push(name)
        popups[name]
          
      hidePopup = ->
        Console.info "Hided Popup",opened_popups
        if not opened_popups.length
          Console.info "No popups"
          $scope.active = false
          $scope.$apply()
          return

        else if opened_popups.length == 1
          last = opened_popups.pop()
          el = $(popups[last].element)
          c = popups[last].controller
          f = ->
            c.onHide() if c.onHide
            el.hide()
            hidePopup()
          if $scope.$root.effects
            el.keyframe "flipOutPopup", 600, f
          else
            f()

        else
          last = opened_popups.pop()
          last_popup = popups[last]
          last_popup.scope.active = false
          $(last_popup.element).hide()

          if opened_popups.length
            last = opened_popups[opened_popups.length-1]
            last_popup = popups[last]
            last_popup.scope.active = true
            $(last_popup.element).show()


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