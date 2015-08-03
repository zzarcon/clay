var el1;
var el2;

window.onload = function() {
  el1 = new Clay('#resizable', {absolute: true});

  el1.on('resize', function(size) {
    // console.log(size.height, size.width);
  });

  el2 = new Clay('#resizable-2');
};