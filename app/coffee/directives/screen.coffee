define ["Console", "jQuery", "Underscore"], (Console, $, _) ->
  "use strict"
  Console.group "Entering screen directive module."
  Console.groupEnd()
  ($compile, $controller) ->
    require: "^screens"
    restrict: "E"
    transclude: true
    scope: true

    controller: ($scope, $element, $attrs) ->
      dialogs = $scope.dialogs = []
      dialogIndex = 0
      @addDialog = (scope, element, attrs) =>
        index = parseInt(attrs.dialogIndex) or dialogs.length + 1
        Console.info "Registered dialog #{index} in screen #{$attrs.screenId}", scope, attrs, @
        dialogs.push
          index: index
          scope: scope
          element: element
          attrs: attrs


      find_dialog = (index) ->
        _.find dialogs, (dialog) ->
          dialog.index is index


      resetDialogs = ->
        _.each dialogs, (dialog) ->
          dialog.scope.show = dialog.scope.hide = false


      recursiveDialog = (index, show, onfinish) ->
        next = (if show then 1 else -1)
        dialog = find_dialog(index)
        if dialog
          elem = $(dialog.element)
          Console.info (if show then "Showing" else "Hiding")+" dialog ", index, dialog, elem, $scope

          if $scope.$root.effects
            animation = undefined
            if index is 1
              animation = (if show then "bounceInDown" else "bounceOutUp")
            else
              animation = (if show then "FlipDialog" else "FlipDialogBack")
            if show
              dialog.scope.show = true
              elem.addClass 'show' #WTF!!!
            # if (show && index==1) dialog_element.css({trand:-2000})
            elem.keyframe animation, (if (index > 1) then 600 else 1000), ->
              unless show
                elem.removeClass 'show'
                dialog.scope.show = false
              # else  dialog_element.css({y:0})
              recursiveDialog index + next, show, onfinish

          else
            dialog.scope.show = show
            recursiveDialog index + next, show, onfinish

        # dialog.scope.$apply();
        else
          onfinish index - next

      $scope.show = (onfinish) ->
        onfinish = onfinish or ->

        $scope.active = true
        $scope.$apply()
        recursiveDialog 1, true, (i) ->
          dialogIndex = i
          onfinish i


      $scope.hide = (onfinish) ->
        onfinish = onfinish or ->

        recursiveDialog dialogIndex, false, (i) ->
          dialogIndex = i
          resetDialogs()
          $scope.active = false
          $scope.$apply()
          onfinish i

    link: (scope, element, attrs, screensCtrl) ->
      screensCtrl.addScreen scope, element, attrs

    template: """<div class="screen" ng-class="{active: active}" ng-transclude></div>"""
    replace: true

