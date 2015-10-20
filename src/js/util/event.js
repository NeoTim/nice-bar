var event = {};


event.bind = function(element, name, listener) {
  element.addEventListener(name, listener, false);
};

event.unbind = function(element, name, listener) {
  element.removeEventListener(name, listener, false);
};

event.once = function(element, name, listener) {
  var that = this;
  var once = function(e) {
    that.unbind(element, name, once);
    listener(e);
  }
  that.bind(element, name, once);
};

module.exports = event;
