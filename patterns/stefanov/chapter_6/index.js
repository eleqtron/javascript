(function() {
  function Parent(name) {
    this.name = name || 'Adam';
  }

  Parent.prototype.say = function() {
    return this.name;
  };

  function Child(name) {}

  inherit(Child, Parent);

  function inherit(C, P) {
    C.prototype = new P(name)
  }

  var kid = new Child();
  kid.name = 'Patrick';
  console.log(kid.say());

}());