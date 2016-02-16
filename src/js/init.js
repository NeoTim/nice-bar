'use strict';

var instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');
var hoverContainer = require('./event/hover-container');

module.exports = function (element) {
  var i = Object.create(instance);
  i.init(element);

  if (i.content.scrollHeight > element.clientHeight) {
    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
    hoverContainer(i);
  }

};
