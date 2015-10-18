let dom = require('./util/dom');

class Instance {
  constructor(element) {

    console.log(element);
    var ele = dom.createElement('<div class="e">hello</div>');
    console.log(ele);
    console.log(ele.className);


    this.container = {
      width: 400
    };

    this.content = {

    };

    this.rail = {

    };

    this.slider = {

    };
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}


module.exports = Instance;
