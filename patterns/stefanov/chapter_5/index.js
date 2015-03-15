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
//console.log(myobj.getName());

function Sandbox() {
  var
    args = Array.prototype.slice.call(arguments),
    callback = args.pop(),
    modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
    i;

  if(!(this instanceof Sandbox)) {
    return new Sandbox(modules,callback);
  }

  this.a = 1;
  this.b = 2;

  if(!modules || modules === '*') {
    modules = [];
    for(i in Sandbox.modules) {
      if(Sandbox.modules.hasOwnProperty(i)) {
        modules.push(i);
      }
    }
  }

  for(i=0; i<modules.length; i+=1) {
    Sandbox.modules[modules[i]](this);
  }

  callback(this);

}

Sandbox.prototype = {
  name: 'My App',
  version: '1.0',
  getName: function() {
    return this.name;
  },
  getVersion: function() {
    return this.version;
  }

};

Sandbox.modules = {};

Sandbox.modules.dom = function(box) {
  box.getElement = function() { return 'Sandbox.modules.dom.getElement' };
  box.getStyle = function() { return 'Sandbox.modules.dom.getStyle' };
  box.foo = 'bar';
};

Sandbox.modules.event = function(box) {
  box.attachEvent = function() { return 'Sandbox.modules.event.attachEvent' };
  box.detachEvent = function() { return 'Sandbox.modules.event.detachEvent' };
};

Sandbox.modules.ajax = function(box) {
  box.makeRequest = function() { return 'Sandbox.modules.ajax.makeRequest' };
  box.getResponse = function() { return 'Sandbox.modules.ajax.getResponse' };
};

Sandbox('ajax', 'dom', function(box) {
  console.log(box.getElement());
  console.log(box.getVersion());
  console.log('Sandbox work!');
});

var Car = function() {};

Car.isShiny = function() {
  return 'yes'
};

Car.prototype.setPrice = function(price) {
  this.price = price;
};

console.log(Car.isShiny());
var ferrari = new Car();
ferrari.setPrice(1000000);
console.log(ferrari.price);
Car.prototype.isShiny = Car.isShiny;
console.log(ferrari.isShiny());