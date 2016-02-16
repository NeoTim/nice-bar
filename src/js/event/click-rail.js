'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {

  /**
   * get slider's new top
   * @param  {number} offsetY  a property from mouseEvent
   * @return {number} newTop slider's new top
   */
  function getNewTop(offsetY) {
    var newTop;

    if (offsetY < i.sliderY.height / 2) {
      newTop = 0;
    } else if (offsetY > i.railY.height - i.sliderY.height / 2) {
      newTop = i.railY.height - i.sliderY.height;
    } else {
      newTop = offsetY - i.sliderY.height / 2;
    }

    return newTop;
  }

  /**
   * update content box scrollTop
   * @param  {number} newTop      slider's newTop
   * @param  {number} originTop   slider's originTop
   * @return null
   */
  function updateContent(newTop, originTop) {
    var journey = newTop - originTop;
    var scrollTop = journey / i.ratioY;
    i.content.element.scrollTop += scrollTop;
    i.sumDeltaY = i.content.element.scrollTop;
  }

  /**
   * update slider's css top
   * @param  {number} newTop slider's new top
   * @return null
   */
  function updateSlider(newTop) {
    dom.css(i.sliderY.element, 'top', newTop);
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  /**
   * clickRailYHandler
   * @param  {object} e  evnet
   * @return null
   */
  function clickRailYHandler(e) {
    var originTop = dom.css(i.sliderY.element, 'top');
    var newTop = getNewTop(e.offsetY);

    updateSlider(newTop);
    updateContent(newTop, originTop);

    e.preventDefault();
  }

  event.bind(i.railY.element, 'click', clickRailYHandler);
};
