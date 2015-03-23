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
/*
window.onload = function() {
  test("Async Test #1", function() {
    pause();
    setTimeout(function() {
      assert(true, "First test completed");
      resume();
    }, 1000);
  });
  test("Async Test #2", function() {
    pause();
    setTimeout(function() {
      assert(true, "Second test completed");
      resume();
    }, 1000);
  });
};
*/

