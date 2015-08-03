import {$, extend} from "./utils";
var elementResizeEvent = require('element-resize-event');

exportModule('Clay', function() {
  class Clay {
    constructor(selector, options) {
      var defaults = {resize: "both", absolute: false};
      this.selector = selector;
      this.options = extend(defaults, options);
      this.el = $(selector);
      this.eventHanlers = {};

      //TODO: Improve way of get initial styles
      this.initialStyles = {
        resize: this.el.style.resize,
        overflow: this.el.style.overflow,
        top: this.el.style.top,
        left: this.el.style.left,
        margin: this.el.style.margin,
        position: this.el.style.position
      };

      this.el.style.resize = this.options.resize;
      this.el.style.overflow = "auto";

      if (this.options.absolute) {
        this.cloneElement();
      }

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

    /**
     * Registers an event handler
     * @param  {string}   eventName 
     * @param  {Function} cb        
     * @return {Object}   instance
     */
    on(eventName, cb) {
      this.eventHanlers[eventName] = cb;

      return this;
    }

    /**
     * Creates a fake element and places it in the same position of the original one
     * TODO: Avoid Re-paints --> Use style.cssText
     * TODO: Remove function from Class
     * @return {void} 
     */
    cloneElement() {
      var fake = this.el.cloneNode();
      var rect = this.el.getBoundingClientRect();
      var top = this.el.offsetTop;
      var left = this.el.offsetLeft;

      this.el.style.top = top + 'px';
      this.el.style.left = left + 'px';
      this.el.style.margin = 0;
      this.el.style.position = "absolute";

      fake.innerHTML = "";
      fake.id = '';
      fake.className = '';
      fake.style.visibility = 'hidden';
      fake.style.height = rect.height + 'px';
      fake.style.width = rect.width + 'px';

      this.el.parentNode.insertBefore(fake, this.el);
    }

    /**
     * TODO: Reset properly when using "absolute: true" param
     * TODO: Remove "fake" associated element if exist
     *
     * Reset element to previous status
     * @return {void} 
     */
    reset() {
      this.el.style.resize = this.initialStyles.resize;
      this.el.style.overflow = this.initialStyles.overflow;
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