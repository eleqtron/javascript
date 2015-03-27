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

  var
    sneak = creep,
    ninjai1 = {
      skulk: creep
    },
    ninjai2 = {
      skulk: creep
    };

  test('functions', function() {
    assert( creep() == window, 'Creeping in the window' );
    assert( sneak() == window, 'Sneaking in the window' );
    assert( ninjai1.skulk() === ninjai1, 'The 1st ninja is skulking' );
    assert( ninjai2.skulk() === ninjai2, 'The 1st ninja is skulking' );
  });


};