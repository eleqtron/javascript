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

};