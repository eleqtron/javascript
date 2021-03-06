window.onload = function() {
  var text = 'Domo arigato!';

  function useless(callback) {
    return callback();
  }

  test('Useless test', function() {
    assert( useless( function() { return text; } ) === text, 'The useless function works!' + text );
  });

  function isNimble() { return true; }

  test('IsNimble test', function() {
    assert( typeof isNimble === 'function', 'isNimble() is defined' );
    assert( isNimble.name === 'isNimble', 'isNimble() has a name isNimble' );
    assert( typeof canFly === 'function', 'canFly() is defined' );
  });


  function creep() { return this;}

  function Ninja() {
    this.skulk = creep;
  }

  var
    sneak = creep,
    ninja1 = new  Ninja(),
    ninja2 = new  Ninja();

  test('functions', function() {
    assert( creep() == window, 'Creeping in the window' );
    assert( sneak() == window, 'Sneaking in the window' );
    assert( ninja1.skulk() === ninja1, 'The 1st ninja is skulking' );
    assert( ninja2.skulk() === ninja2, 'The 1st ninja is skulking' );
  });

  function juggle() {
    var result = 0;
    for(var n=0; n<arguments.length; n++) {
      result += arguments[n];
    }
    this.result = result;
  }

  ninja1 = {};
  ninja2 = {};

  juggle.apply(ninja1, [1,2,3,4]);
  juggle.call(ninja2, 1,2,3,4);

  test('apply and call', function() {
    assert( ninja1.result === 10, 'juggled via apply' );
    assert( ninja2.result === 10, 'juggled via call' );
  });

  test('smallest & largest', function() {
    var arr = [1,2,3,4,5,6,7];
    assert( smallest(arr) === 1, 'Smallest work!' );
    assert( largest(arr)  === 7, 'Largest work!' );
  });

};

function isPalindrome(text) {
  if(text.length <= 1) return true;
  if(text.charAt(0) != text.charAt(text.length - 1)) return false;
  return isPalindrome(text.substr(1, text.length -2 ));
}

function smallest(array) {
  return Math.min.apply(Math, array);
}

function largest(array) {
  return Math.max.apply(Math, array);
}