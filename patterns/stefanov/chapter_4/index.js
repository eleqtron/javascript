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

//scareMe();
//scareMe();

(function() {
  var
    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today = new Date(),
    msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate();
//  console.log(msg);
}());

({
  min: 0,
  max: 100,
  gimmeMax: function() {
    return this.max
  },
  init: function() {
//    console.log(this.gimmeMax());
  }
}).init();


function add(x,y) {
  if(typeof y === 'undefined') {
    return function(y) {
      return x + y;
    }
  }
  return x + y;
}

console.log(typeof add(5));
console.log(add(4)(3));