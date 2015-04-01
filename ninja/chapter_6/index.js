window.onload = function() {

  function User(first_name, last_name) {
   if(!(this instanceof arguments.callee)) {
     return new User(first_name, last_name);
   }
   this.name = first_name + ' ' + last_name;
  }

  var
    name = 'Rukia',
    user = User('Ichiro','Kurosava');

  console.log(name);
  console.log(user.name);
};