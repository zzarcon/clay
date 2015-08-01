var el;

window.onload = function() {
  el = new Clay('#content');

  el.on('resize', function(options) {
    console.log(options);
  });
};