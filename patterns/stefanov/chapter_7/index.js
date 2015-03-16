function singleton() {

  //variant 1
  //экземпляр в статическом свойстве
  // - свойство instance является общедоступным
  (function() {

    function Universe() {
      if(typeof Universe.instance === 'object') {
        return Universe.instance
      }
      this.start_time = 0;
      this.bang = 'Big'
      Universe.instance = this;
      return this;
    }

    var uni1,uni2;
    uni1 = new Universe();
    uni2 = new Universe();
//    console.log(uni1 === uni2)

  }());

  //variant 2
  //экземпляр в замыкании
  // - все что будет добавлено в прототип Universe будет недоступно экземпляру, созданному оригинальной реализацией
  (function() {

    function Universe() {

      var instance = this;

      this.start_time = 0;
      this.bang = 'Big';

      Universe = function() {
        return instance
      };

    }

    var uni1,uni2;
    Universe.prototype.nothing = true;
    uni1 = new Universe();
    Universe.prototype.everything = true;
    uni2 = new Universe();
    show_results(uni1,uni2);

  }());

  //variant 3
  //экземпляр в замыкании с сохранением свойств добавленных в прототип
  (function() {

    function Universe() {

      var instance = this;

      Universe = function() {
        return instance
      };

      Universe.prototype = this;
      instance = new Universe();
      instance.constructor = Universe;

      instance.start_time = 0;
      instance.bang = 'Big';

      return instance;
    }

    var uni1,uni2;
    Universe.prototype.nothing = true;
    uni1 = new Universe();
    Universe.prototype.everything = true;
    uni2 = new Universe();
    show_results(uni1,uni2);

  }());

  //variant 4
  //экземпляр в замыкании с сохранением свойств добавленных в прототип
  (function() {

    var Universe;

    (function() {

      var instance;

      Universe = function() {
        if(instance) {
          return instance;
        }
        instance = this;
        instance.start_time = 0;
        instance.bang = 'Big';
        return instance;
      };
    }());

    var uni1,uni2;
    Universe.prototype.nothing = true;
    uni1 = new Universe();
    Universe.prototype.everything = true;
    uni2 = new Universe();
    show_results(uni1,uni2)

  }());

  function show_results(uni1,uni2) {
    console.log('uni1 === uni2: ', uni1 === uni2);
    console.log('has nothing && everything: ', uni1.nothing && uni1.everything && uni2.nothing && uni2.everything);
    console.log('bang: ', uni1.bang);
  }

}

//singleton();

function fabric() {

  function CarMaker() {}

  CarMaker.prototype.drive = function() {
    return 'Vroom, I have ' + this.doors + ' doors!';
  };

  CarMaker.factory = function(type) {
    var
      constr = type,
      newcar;

    if(typeof CarMaker[constr] !== 'function') {
      throw {
        name: 'Error',
        message: constr + 'doesn\'t exist'
      }
    }

    if (typeof CarMaker[constr].prototype.drive !== 'function') {
      CarMaker[constr].prototype = new CarMaker();
    }

    newcar = new CarMaker[constr]();
    return newcar;

  };

  CarMaker.Compact = function() {
    this.doors = 4;
  };

  CarMaker.Convertible = function() {
    this.doors = 2;
  };

  CarMaker.SUV = function() {
    this.doors = 24;
  };

  var
    corolla = CarMaker.factory('Compact'),
    solstice = CarMaker.factory('Convertible'),
    cherokee = CarMaker.factory('SUV');

  console.log(corolla.drive());
  console.log(solstice.drive());
  console.log(cherokee.drive());

}

//fabric();

function iterator() {

  var agg = (function() {
    var
      index = 0,
      data = [1,2,3,4,5],
      length = data.length;

    return {
      next: function() {
        var element;
        if(!this.hasNext()) {
          return null;
        }
        element = data[index];
        index = index + 2;
        return element;
      },
      hasNext: function() {
        return index < length
      },
      rewind: function() {
        index = 0;
      },
      current: function() {
        return data[index];
      }
    }
  }());

  while(agg.hasNext()) {
    console.log(agg.next());
  }
  agg.rewind();
  console.log(agg.current());

}
iterator();