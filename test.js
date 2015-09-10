var el1;
var el2;

window.onload = function() {
  var selector = 'resizable';
  var element = document.getElementById(selector);

  el1 = new Clay(element, {absolute: true});
  // el1 = new Clay('#' + selector, {absolute: true});

  el1.on('resize', function(size) {
    // console.log(size.height, size.width);
  });

  el2 = new Clay('#resizable-2');
};