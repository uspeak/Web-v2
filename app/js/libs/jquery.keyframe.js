/*!
 * jQuery Keyframe - CSS3 keyframe animations
 * Copyright(c) 2012 Syrus Akbary <me@syrusakbary.com>
 * MIT Licensed.
 *
 * http://github.com/syrusakbary/jquery.keyframe
 */
 
(function($) {
  "use strict";

  $.keyframe = {
    version: "0.1",
    enabled: true,
    useAnimationEnd: true
  };

  var div = document.createElement('div');
  var support = {};
  function getVendorPropertyName(prop) {
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }
  support.animation = getVendorPropertyName('animation');
  support.animationName = getVendorPropertyName('animationName');
  support.animationDuration = getVendorPropertyName('animationDuration');
  support.animationTimingFunction = getVendorPropertyName('animationTimingFunction');
  support.animationFillMode = getVendorPropertyName('animationFillMode');
  support.animationIterationCount = getVendorPropertyName('animationIterationCount');

  var eventNames = {
    'MozAnimation':    'animationend',
    'OAnimation':      'oAnimationEnd',
    'WebkitAnimation': 'webkitAnimationEnd',
    'msAnimation':     'MSAnimationEnd'
  };

  $.cssEase = $.cssEase || {
    '_default': 'linear',
    'ease':     'ease',
    'in':       'ease-in',
    'out':      'ease-out',
    'in-out':   'ease-in-out',
    'snap':     'cubic-bezier(0,1,.5,1)'
  };

  var animationEnd = support.animationEnd = eventNames[support.animation] || null;

  div = null;

  $.fn.keyframe = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;
    var fill = 'both';
    var iterations = 1;
    var name = undefined;

    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    if (typeof properties.name !== 'undefined') {
      name = properties.name;
      delete properties.name;
    }

    if (typeof properties.easing !== 'undefined') {
      easing = properties.easing;
      delete properties.easing;
    }

    if (typeof properties.fill !== 'undefined') {
      fill = properties.fill;
      delete properties.fill;
    }

    if (typeof properties.iterations !== 'undefined') {
      iterations = properties.iterations;
      delete properties.iterations;
    }

    if (typeof properties.duration !== 'undefined') {
      duration = properties.duration;
      delete properties.duration;
    }

    if (typeof properties.complete !== 'undefined') {
      callback = properties.complete;
      delete properties.complete;
    }

    if (typeof properties.queue !== 'undefined') {
      queue = properties.queue;
      delete properties.queue;
    }

    if (typeof properties.delay !== 'undefined') {
      delay = properties.delay;
      delete properties.delay;
    }

    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }
    if (typeof name === 'undefined')   { name = properties; }

    duration = toMS(duration);


    var work = $.keyframe.enabled && support.animation;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    this.each(function() {
    	this.style[support.animationDuration] = duration;
    	this.style[support.animationTimingFunction] = easing;
    	this.style[support.animationFillMode] = fill;
    	this.style[support.animationIterationCount] = iterations;
    	this.style[support.animationName] = name;
    });
    var bound = false;
    var cb = function() {
      if (bound) { self.unbind(animationEnd, cb); }

      if (i > 0) {
        self.each(function() {
		    	this.style[support.animationDuration] = null;
		    	this.style[support.animationTimingFunction] = null;
		    	this.style[support.animationFillMode] = null;
		    	this.style[support.animationIterationCount] = 0;
		    	this.style[support.animationName] = null;
        });
      }

      if (typeof callback === 'function') { callback.apply(self); }
      // if (typeof nextCall === 'function') { nextCall(); }
    };

    if ((i > 0) && (animationEnd) && ($.keyframe.useAnimationEnd)) {
      bound = true;
      self.bind(animationEnd, cb);
    } else {
      window.setTimeout(cb, i);
    }
  }

  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  function toMS(duration) {
    var i = duration;

    if ($.fx.speeds[i]) { i = $.fx.speeds[i]; }

    return unit(i, 'ms');
  }

})(jQuery);