function log() {
  try {
    console.log.apply(console, arguments);
  }
  catch(e) {
    try {
      opera.postError.apply(opera, arguments);
    }
    catch(e) {
      alert(Array.prototype.join.call(arguments, ' '));
    }
  }
}

(function() {
  var results;
  this.assert = function(value, desc) {
    var li = document.createElement('li');
    li.className = value ? 'pass' : 'fail';
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
    if(!value) {
      li.parentNode.parentNode.className = 'fail';
    }
    return li;
  };
  this.test = function test(name, fn) {
    results = document.getElementById('results');
    results = assert(true, name).appendChild( document.createElement('ul') );
    fn();
  }
}());

window.onload = function() {
  test('A test', function() {
    assert(true, 'First test assertion completed');
    assert(true, 'Second test assertion completed');
    assert(true, 'Third test assertion completed');
  });
  test('B test', function() {
    assert(true, 'First test assertion completed');
    assert(false, 'Second test assertion failed');
    assert(true, 'Third test assertion completed');
  });
  test('C test', function() {
    assert(null, 'fail');
    assert(5, 'pass');
  });

};