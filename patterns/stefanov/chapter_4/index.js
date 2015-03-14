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
  console.log(msg);
}());