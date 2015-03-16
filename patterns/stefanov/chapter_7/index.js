(function singleton() {

  //variant 1
  //экземпляр в статическом свойстве
  // - свойство instance является общедоступным
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
  console.log(uni1 === uni2)

}());