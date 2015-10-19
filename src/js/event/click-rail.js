var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  event.bind(i.railY.element, 'click', function(e) {
    var layerY = e.layerY;
    // console.log(e);
    // console.log(e.layerY);
    var top = dom.css(i.sliderY.element, 'top');

    var val;
    val = parseInt(top, 10);
    var stop = val + 50;

    var id = setInterval(function() {
      val = val + 1;
      i.sliderY.element.style.top = val + 'px';

      if (val > stop) {
        window.clearInterval(id)
      }
    }, 1);



  });
}
