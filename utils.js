function extend(a, b){
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function $(selector) {
  return document.querySelector(selector);
}

function raf() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
}

module.exports = {
  extend: extend,
  $: $,
  raf: raf
};