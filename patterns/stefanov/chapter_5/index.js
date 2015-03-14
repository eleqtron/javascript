function Gadget() {
  var name = 'iPod';
  this.getName = function() {
    return name;
  }
}

Gadget.prototype = (function() {
  var browser = 'Mobile Webkit';
  return {
    getBrowser: function() {
      return browser
    }
  }
}());

var toy = new Gadget();
console.log(toy.getName());
console.log(toy.getBrowser());