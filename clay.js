import {$, extend} from "./utils";

exportModule('Clay', function() {
  var defaults = {
    resize: "both"
  };

  class Clay {
    constructor(selector, options) {
      this.selector = selector;
      this.options = extend(defaults, options);
      this.el = $(selector);

      this.el.style.resize = "both";
      this.el.style.overflow = "auto";
    }

    on(eventName) {

    }
  }
  
  return Clay;
});

function exportModule(name, definition) {
  if (typeof module != 'undefined') {
    module.exports = definition();
  } else if (typeof define == 'function' && typeof define.amd == 'object') {
    define(definition);
  } 
  if (window) {
    window[name] = definition();
  }
}