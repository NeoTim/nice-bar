var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  var $content = i.container.element.firstElementChild;

  var ratioY = i.ratioY;
  var railYHeight = i.railY.height;

  function clickRailY(e) {
    var originTop = dom.css(i.sliderY.element, 'top');
    var newTop = e.layerY - i.sliderY.height / 2;

    if (newTop < 1) {
      dom.css(i.sliderY.element, 'top', newTop);
      $content.scrollTop = 0;
      return;
    }

    if (newTop + i.sliderY.height > i.railY.height) newTop = i.railY.height - i.sliderY.height;

    dom.css(i.sliderY.element, 'top', newTop);
    var journey = newTop - originTop;
    var scrollTop = journey / ratioY;
    $content.scrollTop += scrollTop;
  }

  event.bind(i.railY.element, 'click', clickRailY);

}
