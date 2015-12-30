'use strict';

let event = {
  bind(element, name, listener) {
    element.addEventListener(name, listener, false);
  },

  unbind(element, name, listener) {
    element.removeEventListener(name, listener, false);
  },

  once(element, name, listener) {
    let that = this;
    let once = function(e) {
      that.unbind(element, name, once);
      listener(e);
    };

    that.bind(element, name, once);
  }
};

module.exports = event;
