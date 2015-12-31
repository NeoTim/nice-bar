'use strict';

import Instance from './instance';
import clickRail from './event/click-rail';
import dragSlider from './event/drag-slider';
import mouseWheel from './event/mouse-wheel';
import pressKeyboard from './event/press-keyboard';

export default function(element) {
  let $content = element.firstElementChild;
  if ($content.scrollHeight > $content.clientHeight) {
    let i = new Instance(element);

    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
  }
};
