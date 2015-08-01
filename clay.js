import {$, extend} from "./utils";
var elementResizeEvent = require('element-resize-event');

exportModule('Clay', function() {
  var defaults = {
    resize: "both"
  };

  class Clay {
    constructor(selector, options) {
      this.selector = selector;
      this.options = extend(defaults, options);
      this.el = $(selector);
      this.eventHanlers = {};

      this.el.style.resize = this.options.resize;
      this.el.style.overflow = "auto";

      this.addEvents();
    }

    addEvents() {
      elementResizeEvent(this.el, function() {
        var cb = this.eventHanlers['resize'];
        if (!cb) return;
        
        var size = this.el.getBoundingClientRect();
        cb(size);
      }.bind(this));
    }

    on(eventName, cb) {
      this.eventHanlers[eventName] = cb;
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