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

module.exports = {
  extend: extend,
  $: $
};