Timer = (callback, delay) ->
  timerId = undefined
  start = undefined
  remaining = delay
  @pause = ->
    window.clearTimeout timerId
    remaining -= new Date() - start

  @resume = ->
    start = new Date()
    timerId = window.setTimeout(callback, remaining)

  @resume()

TimerInterval = (callback, delay) ->
  timerId = undefined
  start = undefined
  remaining = delay
  @pause = ->
    window.clearInterval timerId
    remaining -= new Date() - start

  @resume = ->
    start = new Date()
    timerId = window.setInterval(callback, remaining)

  @resume()

isString = (o) ->
  typeof o is "string" or (typeof o is "object" and o.constructor is String)

String::format = ->
  formatted = this
  i = 0

  while i < arguments_.length
    regexp = new RegExp("\\{" + i + "\\}", "gi")
    formatted = formatted.replace(regexp, arguments_[i])
    i++
  formatted

window.asFunc = (v) ->
  -> v