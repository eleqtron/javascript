window.onload = function() {

  function Ninja() {
    this.swung = false;
  }

  Ninja.prototype.swingSword = function() {
    return this.swung;
  };

  Ninja.prototype.getTestWord = function() {
    return 'test word';
  };

  var ninja = new Ninja();
  console.log('ninja.swingSword', ninja.swingSword());
  console.log('ninja.getTestWord', ninja.getTestWord());


};