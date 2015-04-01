window.onload = function() {

  function Ninja() {}

  Ninja.prototype.swingSword = function() {
    return true;
  };

  var
    ninja = Ninja(),
    ninja2 = new Ninja();
  console.log('ninja === undefined', ninja === undefined);
  console.log('ninja2 && ninja2.swingSword && ninja2.swingSword()', ninja2 && ninja2.swingSword && ninja2.swingSword());


};