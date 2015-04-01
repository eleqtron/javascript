window.onload = function() {

  function Person(){}
  Person.prototype.dance = function() {};

  function Ninja(){}
  Ninja.prototype = {dance: Person.prototype.dance};

  var ninja = new Ninja();
  console.log(ninja instanceof Ninja);
  console.log(ninja instanceof Person);
  console.log(ninja instanceof Object);

};