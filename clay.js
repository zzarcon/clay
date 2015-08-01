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
      this.eventHanlers = {};

      this.el.style.resize = this.options.resize;
      this.el.style.overflow = "auto";

      this.addEvents();
    }

    addEvents() {
      this.el.addEventListener('mouseenter', function() {
        console.log('enter');
      }.bind(this));

      this.el.addEventListener('mouseleave', function() {
        console.log('leave');

        if (this.isResizing) {
          this.isResizing = false;
          console.log('STOP');
        }
      }.bind(this));

      addResizeListener(this.el, function() {
        console.log('resized');
        this.isResizing = true;
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