var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  var $content = i.container.element.firstElementChild;

  var ratioY = i.ratioY;
  var railYHeight = i.railY.height;

  function clickRailY(e) {
    var originTopNumber = parseInt(dom.css(i.sliderY.element, 'top'), 10);
    var newTopNumber = e.layerY - i.sliderY.height / 2;
    var newTop = newTopNumber.toString() + 'px';

    if (newTopNumber < 1) {
      dom.css(i.sliderY.element, 'top', newTop);
      $content.scrollTop = 0;
      return;
    }

    if (newTopNumber + i.sliderY.height > i.railY.height) newTopNumber = i.railY.height - i.sliderY.height;

    dom.css(i.sliderY.element, 'top', newTop);
    var journey = newTopNumber - originTopNumber;
    var scrollTop = journey / ratioY;
    $content.scrollTop += scrollTop;

  }

  event.bind(i.railY.element, 'click', clickRailY);

}
