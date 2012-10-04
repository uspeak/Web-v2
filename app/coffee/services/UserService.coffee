define ["Console", "Underscore", "lib/base64"], (Console, _, Base64) ->
  "use strict"
  Console.group "Entering UserService module."
  
  make_base_auth = (user, pass) ->
    tok = user + ":" + pass
    hash = Base64.encode(tok)
    "Basic " + hash

  service = ($resource, $http) ->
    $http.defaults.withCredentials = true
    UserService = $resource "#{ API_BASE }users/:controller.json", {},
      register:
        method: "POST"
        params:
          controller: "add"

      login:
        method: "GET"
        params:
          controller: "token"

    default_opts =
      error: ->
      success: ->

    UserService::setToken = (user, pass) ->
      unless pass
        Console.info "Successful login. Token: {0}".format(user)
        @token = user
      auth = make_base_auth(user, pass or "")
      $http.defaults.headers.post["Authorization"] = auth
      $http.defaults.headers.get = $http.defaults.headers.get or {}
      $http.defaults.headers.get["Authorization"] = auth

    UserService::login = (user, pass, opts) ->
      $this = this
      opts = _.extend({}, default_opts, opts)
      @setToken user, pass
      
      # console.log('LOGIN: ',user,pass,opts,$http.defaults.headers)
      @$login ((data) ->
        $this.setToken data.res  unless data.res is 500
        opts.success?.call $this, data
      ), (data) ->
        opts.error?.call $this, data.res, data


    UserService::register = (data, opts) ->
      $this = this
      @User = data
      opts = _.extend({}, default_opts, opts)
      @$register (data) ->
        if isString(data.res)
          $this.setToken data.res
          opts.success?.call $this, data

    UserService

  Console.groupEnd()
  service
