'use strict';

jest.dontMock('../../src/js/util/dom');

describe('dom', function () {
  var dom = require('../../src/js/util/dom');
  var buttonStr = '<button id="button" class="button" style="position: absolute;">';
  var $button;

  beforeEach(function () {
    document.body.innerHTML = buttonStr;
    $button = document.getElementById('button');
  });

  it('can create element', function () {
    var str = '<div><span>hello world</span></div>';
    var elem = dom.createElement(str);

    expect(elem.tagName).toBe('DIV');
    expect(elem.innerHTML).toBe('<span>hello world</span>');
  });

  it('can appenTo', function () {
    var elem = dom.createElement('<input id="input" type="text" value="hello" />');
    dom.appendTo(elem, document.body);
    var $input = document.getElementById('input');
    expect($input.value).toBe('hello');
  });

  it('can add class to an element', function () {
    dom.addClass($button, 'my-class');
    expect($button.className).toBe('button my-class');
  });

  it('can remove class to an element', function () {
    dom.removeClass($button, 'button');
    expect($button.className).toBe('');
  });

  it('Get style of an element', function () {
    var position = dom.css($button, 'position');
    expect(position).toBe('absolute');
  });

  it('can set single css property for an element', function () {
    dom.css($button, 'position', 'fixed');
    dom.css($button, 'width', 100);

    var position = dom.css($button, 'position');
    var width = dom.css($button, 'width');

    expect(position).toBe('fixed');
    expect(width).toBe(100);
  });

  it('can set multi css property for an element', function () {
    dom.css($button, {
      position: 'fixed',
      width: '100px',
      height: 200
    });

    var position = dom.css($button, 'position');
    var width = dom.css($button, 'width');
    var height = dom.css($button, 'height');

    expect(position).toBe('fixed');
    expect(width).toBe(100);
    expect(height).toBe(200);
  });

});
