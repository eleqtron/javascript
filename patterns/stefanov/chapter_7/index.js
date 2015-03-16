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

    show_results(Universe);

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

    show_results(Universe);

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

    show_results(Universe);

  }());

  function show_results(Universe) {
    var uni1,uni2;
    Universe.prototype.nothing = true;
    uni1 = new Universe();
    Universe.prototype.everything = true;
    uni2 = new Universe();
    console.log('uni1 === uni2: ', uni1 === uni2);
    console.log('has nothing && everything: ', uni1.nothing && uni1.everything && uni2.nothing && uni2.everything);
    console.log('bang: ', uni1.bang);
  }

}

singleton();