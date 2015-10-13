var instance = require('./instance');

module.exports = function(element) {
  console.log(element);
  var i = new instance(instance);
  console.log(i.container.width);
};
