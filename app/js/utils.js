String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

Object.build = function(o) {
   var initArgs = Array.prototype.slice.call(arguments,1)
   function F() {
      if((typeof o.init === 'function') && initArgs.length) {
         o.init.apply(this,initArgs)
      }
   }
   F.prototype = o
   return new F()
}


var asFunc = function(v) {return function() {return v;}};

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };
    this.resume = function() {
        start = new Date();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

function TimerInterval(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearInterval(timerId);
        remaining -= new Date() - start;
    };
    this.resume = function() {
        start = new Date();
        timerId = window.setInterval(callback, remaining);
    };

    this.resume();
}

function isString(o) {
    return typeof o == "string" || (typeof o == "object" && o.constructor === String);
}
