define(['Console','Underscore','libs/base64'], function (Console,_, Base64) {
    "use strict";
    Console.group("Entering UserService module.");
    var make_base_auth = function (user, pass) {
      var tok = user + ':' + pass;
      var hash = Base64.encode(tok);
      return "Basic " + hash;
    }
    var service = function ($resource,$http) {
    $http.defaults.withCredentials = true;
    var UserService = $resource('http://v4.uspeakapp.com/users/:controller.json',
        {}, {
        register:   {method:'POST', params:{controller:'add'}},
        login: { method: 'GET', params:{controller:'token'} },
        }
    );
    var default_opts = {
        error: function() {},
        success: function() {}
    }
    UserService.prototype.setToken = function (user,pass) 
    {   
        if (!pass) {
            Console.info('Successful login. Token: {0}'.format(user))
            this.token = user;
        }
        var auth = make_base_auth(user,pass||"");
        $http.defaults.headers.post['Authorization']= auth;
        $http.defaults.headers.get = $http.defaults.headers.get || {};
        $http.defaults.headers.get['Authorization']= auth;
    }
    UserService.prototype.login = function(user,pass,opts) {
        var $this = this;
        opts = _.extend({},default_opts,opts);
        this.setToken(user,pass);
        // console.log('LOGIN: ',user,pass,opts,$http.defaults.headers)
        this.$login(function(data) {
            if (data.res!=500) $this.setToken(data.res);
            opts.success.call($this, data);
        },function (data){
            opts.error.call($this, data.res, data);
        });
    };
    UserService.prototype.register = function (data,opts) 
    {
        var $this = this;
        this.User = data;
        opts = _.extend({},default_opts,opts)
        this.$register(function(data) {
            if (!isString(data.res)) opts.error.call($this, data.res, data);
            else {
                $this.setToken(data.res);
                opts.success.call($this, data);
            }
        })
        // return User.update({},{ User:{
        //       username:username,
        //       password:password,
        //       email:email,
        //       profile: profile,
        //       lang_dir: lang_dir,
        //       points: points
        // }})
        //'{"User":{"username":"' + username + '","password":"' + password + '","email":"' + email + '","profile":' + profile + ',"lang_dir":' + language + ',"points":' + points + '}}'
    }
 
    return UserService;
    };

    Console.groupEnd();
    return service;
});
