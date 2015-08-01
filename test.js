var el;

window.onload = function() {
  el = new Clay('#resizable', {absolute: true});

  el.on('resize', function(size) {
    // console.log(size.height, size.width);
  });
};