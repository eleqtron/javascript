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
//iterator();

function decorator() {

  (function() {
    function Sale(price) {
      this.price = price;
    }

    Sale.prototype.getPrice = function() {
      return this.price;
    };

    Sale.decorators = {};

    Sale.decorators.fedtax = {
      getPrice: function() {
        var price = this.uber.getPrice();
        price += price*5/100;
        return price;
      }
    };

    Sale.decorators.quebec = {
      getPrice: function() {
        var price = this.uber.getPrice();
        price += price*7.5/100;
        return price;
      }
    };

    Sale.decorators.money = {
      getPrice: function() {
        return '$' + this.uber.getPrice().toFixed(2);
      }
    };

    Sale.decorators.cdn = {
      getPrice: function() {
        return 'CDN$' + this.uber.getPrice().toFixed(2);
      }
    };

    Sale.prototype.decorate = function(decorator) {
      var
        F = function() {},
        overrrides = this.constructor.decorators[decorator],
        i,newobj;

      F.prototype = this;
      newobj = new F();
      newobj.uber = F.prototype;
      for(i in overrrides) {
        if(overrrides.hasOwnProperty(i)) {
          newobj[i] = overrrides[i];
        }
      }
      return newobj;
    };

    var sale = new Sale(100);
    console.log(sale.getPrice());
    sale = sale.decorate('fedtax');
    sale = sale.decorate('quebec');
    sale = sale.decorate('money');
    console.log(sale.getPrice());

    sale = new Sale(100);
    console.log(sale.getPrice());
    sale = sale.decorate('fedtax');
    sale = sale.decorate('cdn');
    console.log(sale.getPrice());
  }());


  (function() {

    function Sale(price) {
      this.price = price;
      this.decorators_list = [];
    }

    Sale.prototype.getPrice = function() {
      var
        max = this.decorators_list.length,
        price = this.price,
        i,name;

      for(i=0; i<max; i+=1) {
        name = this.decorators_list[i];
        price = Sale.decorators[name].getPrice(price);
      }
      return price;
    };

    Sale.decorators = {};

    Sale.decorators.fedtax = {
      getPrice: function(price) {
        return price + price*5/100;
      }
    };

    Sale.decorators.quebec = {
      getPrice: function(price) {
        return price + price*7.5/100;
      }
    };

    Sale.decorators.money = {
      getPrice: function(price) {
        return '$' + price.toFixed(2);
      }
    };

    Sale.decorators.cdn = {
      getPrice: function(price) {
        return 'CDN$' + price.toFixed(2);
      }
    };

    Sale.prototype.decorate = function(decorator) {
      this.decorators_list.push(decorator);
    };

    var sale = new Sale(100);
    console.log(sale.getPrice());
    sale.decorate('fedtax');
    sale.decorate('quebec');
    sale.decorate('money');
    console.log(sale.getPrice());

    sale = new Sale(100);
    console.log(sale.getPrice());
    sale.decorate('fedtax');
    sale.decorate('cdn');
    console.log(sale.getPrice());

  }());

}

//decorator();


function strategy() {

  var validator = {
    types: {},
    messages: [],
    config: {},
    validate: function(data) {
      var i, msg, type, checker, result_ok;
      this.messages = [];
      for(i in data) {
        if(data.hasOwnProperty(i)) {
          type = this.config[i];
          checker = this.types[type];
          if(!type) {
            continue;
          }
          if(!checker) {
            throw {
              name: 'ValidationError',
              message: 'No handler to validate type '+ type
            }
          }

          result_ok = checker.validate(data[i]);
          if(!result_ok) {
            msg = 'Invalid value for *' + i + '*, ' + checker.instructions();
            this.messages.push(msg);
          }

        }
      }
      return this.hasErrors();
    },
    hasErrors: function() {
      return this.messages.length !== 0;
    }
  };

  validator.types.isNonEmpty = {
    validate: function(value) {
      return value !== '';
    },
    instructions: function() {
      return 'the value can not be empty';
    }
  };

  validator.types.isNumber = {
    validate: function(value) {
      return !isNaN(value);
    },
    instructions: function() {
      return 'the value can be a valid number';
    }
  };

  validator.types.isAlphaNum = {
    validate: function(value) {
      return !/[^a-z0-9]/i.test(value);
    },
    instructions: function() {
      return 'the value can only contain characters and numbers';
    }
  };

  var data = {
    first_name: 'Super',
    last_name: 'MAn',
    age:'unknown',
    username:'o_O'
  };

  validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
  };

  validator.validate(data);
  if(validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
  }

}

//strategy();

function facade() {
  //Example 1
  var myevent = {
    stop: function(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };


  //Example 2
  // a simple facade that masks the various browser-specific methods
  function addEvent( element, event, callback ) {

    if( window.addEventListener ) {
      element.addEventListener( event, callback, false );
    } else if( document.attachEvent ) {
      element.attachEvent( 'on' + event, callback );
    } else {
      element[ 'on' + event ] = callback;
    }

  }

  //Example 3
  var Mortgage, Bank, Credit, Background;

  Mortgage = function(name) {
    this.name = name;
  };

  Mortgage.prototype = {
    applyFor: function(amount) {
      var result = 'approved';
      if (!new Bank().verify(this.name, amount)) {
        result = "denied";
      } else if (!new Credit().get(this.name)) {
        result = "denied";
      } else if (!new Background().check(this.name)) {
        result = "denied";
      }
      return this.name + " has been " + result + " for a " + amount + " mortgage";
    }
  };

  Bank = function() {
    this.verify = function(name, amount) {
      //complex logic ...
      return true;
    }
  };

  Credit = function() {
    this.get = function(name, amount) {
      //complex logic ...
      return true;
    }
  };

  Background = function() {
    this.check = function(name, amount) {
      //complex logic ...
      return true;
    }
  };

  function run() {
    var
      mortrage = new Mortgage('John'),
      result = mortrage.applyFor('$100000');
    console.log(result);
  }

  run();

}

//facade();

function proxy() {

  function GeoCoder() {
    this.getLatLng = function(address) {
      if (address === "Amsterdam") {
        return "52.3700° N, 4.8900° E";
      } else if (address === "London") {
        return "51.5171° N, 0.1062° W";
      } else if (address === "Paris") {
        return "48.8742° N, 2.3470° E";
      } else if (address === "Berlin") {
        return "52.5233° N, 13.4127° E";
      } else {
        return "";
      }
    }
  }

  function GeoProxy() {
    var
      geocoder = new GeoCoder(),
      geocache = {};

    return {
      getLatLng: function(address) {
        if(!geocache[address]) {
          geocache[address] = geocoder.getLatLng(address);
        }
        console.log(address + ': ' + geocache[address]);
        return geocache[address];
      },
      getCount: function() {
        var count = 0;
        for(var code in geocache) { count++ }
        return count;
      }
    }

  }

  function run() {
    var geo = new GeoProxy();

    // geolocation requests

    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");

    console.log("\nCache size: " + geo.getCount());
  }

  run();

}

//proxy();


//посредник
function mediator() {

  var
    scoreboard,
    mediator;

  function Player(name) {
    this.name = name;
    this.points = 0;
  }

  Player.prototype.play = function() {
    this.points += 1;
    mediator.played();
  };

  scoreboard = {
    update: function(score) {
      var i, msg='';
      for(i in score) {
        if(score.hasOwnProperty(i)) {
          msg += i + ' ' + score[i] + ' ';
        }
      }
      console.log(msg);
    }
  };

  mediator = {
    players: {},
    setup: function() {
      var players = this.players;
      players.home  = new Player('Home');
      players.guest = new Player('Guest');
    },
    played: function() {
      var
        players = this.players,
        score = {
          Home: players.home.points,
          Guest: players.guest.points
        };
      scoreboard.update(score);

    },
    keypress: function(e) {
      e = e || window.event;
      if(e.which === 49) {
        mediator.players.guest.play();
        return;
      }
      if(e.which === 48) {
        mediator.players.home.play();
        return;
      }
    },
    winner: function() {
      var
        players = this.players;
      if(players.home.points > players.guest.points) {
        return players.home.name;
      }
      else if(players.home.points < players.guest.points) {
        return players.guest.name;
      }
      else {
        return 'Draw';
      }
    }
  };

  mediator.setup();
  window.onkeypress = mediator.keypress;
  setTimeout(function() {
    window.onkeypress = null;
    console.log('Game Over! Winner: ' + mediator.winner())
  }, 3000);

}

//mediator();

function observer() {

  (function() {
    var publisher = {
      subscribers: {
        any: []
      },
      subscribe: function(fn, type) {
        type = type || 'any';
        if(typeof this.subscribers[type] === 'undefined') {
          this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
      },
      unsubscribe: function(fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
      },
      publish: function(publication, type) {
        this.visitSubscribers('publish', publication, type);
      },
      visitSubscribers: function(action, arg, type) {
        var
          pubtype = type || 'any',
          subscribers = this.subscribers[pubtype],
          i,
          max = subscribers.length;

        for(i=0; i<max; i+=1)  {
          if(action == 'publish') {
            subscribers[i](arg);
          }
          else {
            if(subscribers[i] == arg) {
              subscribers.splice(i, 1);
            }
          }
        }
      }
    };

    function makePublisher(o) {
      var i;
      for(i in publisher) {
        if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
          o[i] = publisher[i];
        }
      }
      o.subscribers = {any:[]};
    }

    var paper = {
      daily: function() {
        this.publish('big news today');
      },
      monthly: function() {
        this.publish('interesting analysis', 'monthly');
      }
    };

    makePublisher(paper);

    var joe = {
      drinkCoffee: function(paper) {
        console.log('Just read ' + paper);
      },
      sundayPreNap: function(monthly) {
        console.log('About to fall asleep reading this ' + monthly);
      }
    };

    paper.subscribe(joe.drinkCoffee);
    paper.subscribe(joe.sundayPreNap, 'monthly');

    paper.daily();
    paper.daily();
    paper.monthly();

    makePublisher(joe);
    joe.tweet = function(msg) {
      this.publish(msg);
    };

    paper.readTweets = function(tweet) {
      console.log('Call big Meeting! Someone ' + tweet);
    };
    joe.subscribe(paper.readTweets);

    joe.tweet('hated the paper today!');
  }());


  (function() {

    function Click() {
      this.handlers = []; //observers
    }

    Click.prototype = {

      subscribe: function(fn) {
        this.handlers.push(fn);
      },
      unsubscribe: function(fn) {
        this.handlers = this.handlers.filter(
          function(item) {
            if(item !== fn) {
              return item;
            }
          }
        )
      },
      fire: function(o, thisObj) {
        var scope = thisObj || window;
        this.handlers.forEach(function(item) {
          item.call(scope, o);
        })
      }
    };

    var log = (function() {
      var log = "";

      return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
      }
    })();

    function run() {

      var clickHandler = function(item) {
        log.add('fired: ' + item);
      };

      var click = new Click();

      click.subscribe(clickHandler);
      click.fire('event #1');
      click.unsubscribe(clickHandler);
      click.fire('event #2');
      click.subscribe(clickHandler);
      click.fire('event #3');

      log.show();

    }

    run();

  }());

  (function() {

    var publisher = {
      subscribers: {
        any: []
      },
      on: function (type, fn, context) {
        type = type || 'any';
        fn = typeof fn === "function" ? fn : context[fn];

        if (typeof this.subscribers[type] === "undefined") {
          this.subscribers[type] = [];
        }
        this.subscribers[type].push({fn: fn, context: context || this});
      },
      remove: function (type, fn, context) {
        this.visitSubscribers('unsubscribe', type, fn, context);
      },
      fire: function (type, publication) {
        this.visitSubscribers('publish', type, publication);
      },
      visitSubscribers: function (action, type, arg, context) {
        var pubtype = type || 'any',
          subscribers = this.subscribers[pubtype],
          i,
          max = subscribers ? subscribers.length : 0;

        for (i = 0; i < max; i += 1) {
          if (action === 'publish') {
            subscribers[i].fn.call(subscribers[i].context, arg);
          } else {
            if (subscribers[i].fn === arg && subscribers[i].context === context) {
              subscribers.splice(i, 1);
            }
          }
        }
      }
    };


    function makePublisher(o) {
      var i;
      for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
          o[i] = publisher[i];
        }
      }
      o.subscribers = {any: []};
    }

    var game = {

      keys: {},

      addPlayer: function (player) {
        var key = player.key.toString().charCodeAt(0);
        this.keys[key] = player;
      },

      handleKeypress: function (e) {
        e = e || window.event; // IE
        if (game.keys[e.which]) {
          game.keys[e.which].play();
        }
      },

      handlePlay: function (player) {
        var i,
          players = this.keys,
          score = {};

        for (i in players) {
          if (players.hasOwnProperty(i)) {
            score[players[i].name] = players[i].points;
          }
        }
        this.fire('scorechange', score);
      }
    };

    function Player(name, key) {
      this.points = 0;
      this.name = name;
      this.key  = key;
      this.fire('newplayer', this);
    }

    Player.prototype.play = function () {
      this.points += 1;
      this.fire('play', this);
    };

    var scoreboard = {
      update: function(score) {
        var i, msg='';
        for(i in score) {
          if(score.hasOwnProperty(i)) {
            msg += i + ' ' + score[i] + ' ';
          }
        }
        console.log(msg);
      }
    };

    makePublisher(Player.prototype);
    makePublisher(game);

    Player.prototype.on("newplayer", "addPlayer", game);
    Player.prototype.on("play",      "handlePlay", game);

    game.on("scorechange", scoreboard.update, scoreboard);

    window.onkeypress = game.handleKeypress;

    var playername, key;
    while (1) {
      playername = prompt("Add player (name)");
      if (!playername) {
        break;
      }
      while (1) {
        key = prompt("Key for " + playername + "?");
        if (key) {
          break;
        }
      }
      new Player(playername,  key);
    }

  }());

}
observer();