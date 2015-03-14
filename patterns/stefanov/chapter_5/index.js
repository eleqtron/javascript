function Gadget() {
  var name = 'iPod';
  this.getName = function() {
    return name;
  }
}
var toy = new Gadget();
console.log(toy.getName());