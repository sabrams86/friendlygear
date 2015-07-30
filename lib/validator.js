var Validator = function() {
  this._errors = [];
}

Validator.prototype.exists = function(input, message) {
  if(!input || input.trim() === ''){
    this._errors.push(message);
  }
};

Validator.prototype.password = function(pass1, pass2, message) {
  if(pass1 !== pass2){
    this._errors.push(message);
  }
}

module.exports = Validator;
