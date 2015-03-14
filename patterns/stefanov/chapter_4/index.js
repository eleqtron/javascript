var setup = function() {
  var count = 0;
  return function() {
    return count+=1
  }
};
var next = setup();
//console.log(next());
//console.log(next());

var scareMe = function() {
  console.log('Boo!');
  scareMe = function() {
    console.log('DoubleBoo!');
  };
};

scareMe();
scareMe();