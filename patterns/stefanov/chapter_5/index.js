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
//console.log(toy.getName());
//console.log(toy.getBrowser());

var myobj;
(function() {
  var name = 'my, oh my';
  myobj = {
    getName: function() {
      return name;
    }
  }
}());
//console.log(myobj.getName());

var newobj = (function() {
  var name = 'my, oh my';
  return {
    getName: function() {
      return name;
    }
  }
}());
console.log(myobj.getName());
