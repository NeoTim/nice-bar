var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  var ratioY = i.ratioY;

  event.bind(i.railY.element, 'click', function(e) {

    var top = dom.css(i.sliderY.element, 'top');
    var topInt = parseInt(top, 10);

    if (e.layerY > topInt) {
      var stop = topInt + 50;
      var id = setInterval(function() {
        topInt++;
        i.sliderY.element.style.top = topInt + 'px';

        if (topInt > stop) {
          window.clearInterval(id)
        }
      }, 1);

    } else {
      var stop = topInt - 50;
      var id = setInterval(function() {
        topInt--;
        i.sliderY.element.style.top = topInt + 'px';

        if (topInt < stop) {
          window.clearInterval(id)
        }
      }, 1);

    }
    // console.log(topInt);
    // console.log(parseInt(dom.css(i.sliderY.element, 'top'), 10));



  });
}
