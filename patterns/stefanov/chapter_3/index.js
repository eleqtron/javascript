var Person = function(name) {

  if(!(this instanceof Person)) {
    return new Person(name)
  }

  this.name = name;
};

Person.prototype.sayName = function() {
  return 'I am ' + this.name;
};


var adam = new Person('Adam');
console.log(adam.sayName());