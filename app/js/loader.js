(function() {
  var root = this;
  var loader = new function() {
    this.modules = {}
    this.addModule = function(module) {
      this.modules[module] = false;
    }
    this.addModules = function(modules) {
      for (var module in modules) this.addModule(modules[module]);
    }
    this.setLoaded = function(module) {
      console.log('Set loaded',module)
      this.modules[module] = true;
    }
    this.loaded = function() {
      loaded = 0
      not_loaded = 0
      for (var module in this.modules) {
        // if (!this.modules.hasOwnProperty(name)) continue;
        if (this.modules[module]) loaded++;
        else not_loaded++;
      }
      if (!loaded && !not_loaded) return 1;
      return loaded/(loaded+not_loaded);
    }
  }
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = loader;
    }
    exports.loader = loader;
  } else {
    root['loader'] = loader;
  }
}).call(this);