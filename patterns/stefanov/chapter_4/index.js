var setup = function() {
  var count = 0;
  return function() {
    return count+=1
  }
};
var next = setup();
console.log(next());
console.log(next());