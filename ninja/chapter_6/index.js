window.onload = function() {

  function Ninja() {

    this.swung = false;

    this.swingSword = function() {
      return !this.swung;
    };

    this.getTestWord = function() {
      return 'object';
    }

  }

  Ninja.prototype.swingSword = function() {
    return this.swung;
  };

  Ninja.prototype.getTestWord = function() {
    return 'prototype object';
  };

  var ninja = new Ninja();
  console.log('ninja.swingSword', ninja.swingSword());
  console.log('ninja.getTestWord', ninja.getTestWord());


};