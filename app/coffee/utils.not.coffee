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

window.asFunc = (v) ->
  -> v