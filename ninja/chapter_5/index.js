window.onload = function() {

  (function() {

    var
      outerValue = 'ninja',
      later;

    function outerFunction() {
      var innerValue = 'samurai';

      function innerFuntion(paramValue) {
        test('innerFuntion', function() {
          assert( outerValue, 'Inner can see the ninja' );
          assert( innerValue, 'Inner can see the samurai' );
          assert( paramValue, 'Inner can see the wakizashi' );
        });
      }

      later = innerFuntion;
    }

    var tooLate = 'ronin';

    outerFunction();
    later('wakizashi');
  }());

  (function() {

    function Ninja() {
      var feints = 0;

      this.getFeints = function() {
        return feints;
      };

      this.feint = function() {
        feints++;
      };
    }

    var ninja = new Ninja();
    ninja.feint();

    test('ninja', function() {
      assert( ninja.getFeints() === 1, 'ninja.getFeints() === 1' );
      assert( ninja.feints === undefined, 'ninja.feints === undefined' );
    });

  }());

};