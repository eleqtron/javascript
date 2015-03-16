function log(message) {
  console.log(message);
}

(function() {
  function Parent(name) {
    this.name = name || 'Adam';
  }

  Parent.prototype.say = function() {
    return this.name;
  };

  function Child(name) {}

  inherit(Child, Parent);

  function inherit(C, P) {
    C.prototype = new P(name)
  }

  var kid = new Child();
  kid.name = 'Patrick';
//  log(kid.say());

}());


(function() {

  var article, blog, page;

  function Child(a,b,c,d) {
    Parent.apply(this, arguments)
  }

  function Article() {
    this.tags = ['js','css'];
  }
  article = new Article();

  function BlogPost() {}
  BlogPost.prototype = article
  blog = new BlogPost();

  function StaticPage() {
    Article.call(this)
  }
  page = new StaticPage();

//  log(article.hasOwnProperty('tags'));
//  log(blog.hasOwnProperty('tags'));
//  log(page.hasOwnProperty('tags'));
}());

(function() {

  function Cat() {
    this.legs = 4;
    this.say = function() {
      return 'meaoww';
    }
  }

  function Bird() {
    this.wings = 2;
    this.fly = true;
  }

  function CatWings() {
    Cat.apply(this);
    Bird.apply(this);
  }

  var jane = new CatWings();
//  log(jane)

}());

(function() {

  function Parent(name) {
    this.name = name || 'Adam';
  }

  Parent.prototype.say = function() {
    return this.name;
  };

  function Child(name) {
    Parent.apply(this, arguments);
  }

  Child.prototype = new Parent();

  var kid = new Child('Patrick');
  log(kid.name);
  log(kid.say());
  delete kid.name;
  log(kid.say());
}());