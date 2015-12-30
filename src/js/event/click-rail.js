'use strict';

let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {

  /**
   * get slider's new top
   * @param  {number} offsetY  a property from mouseEvent
   * @return {number} newTop slider's new top
   */
  function getNewTop(offsetY) {
    let newTop;

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
    let journey = newTop - originTop;
    let scrollTop = journey / i.ratioY;
    i.content.element.scrollTop += scrollTop;
  }

  /**
   * update slider's css top
   * @param  {number} newTop slider's new top
   * @return null
   */
  function updateSlider(newTop) {
    dom.css(i.sliderY.element, 'top', newTop);
  }

  /**
   * updateSliderYGeometry
   * @param  {number} newTop slider's new top
   * @return null
   */
  function updateSliderYGeometry(newTop) {
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  /**
   * clickRailYHandler
   * @param  {object} e  evnet
   * @return null
   */
  function clickRailYHandler(e) {
    let originTop = dom.css(i.sliderY.element, 'top');
    let newTop = getNewTop(e.offsetY);

    updateSlider(newTop);
    updateContent(newTop, originTop);
    updateSliderYGeometry(newTop);

    e.preventDefault();
  }

  event.bind(i.railY.element, 'click', clickRailYHandler);
};
