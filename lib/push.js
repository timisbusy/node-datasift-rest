var _ = require('underscore');

module.exports = {
  validate: function validate(options, callback) {
    var call = "push/validate";
    var params = _.extend(this.vars, options);
    console.log(params);
    this.sendRequest(call, params, callback);
  },
  create: function create(options, callback) {
    var call = "push/create";
    var params = _.extend(this.vars, options);
    console.log(params);
    this.sendRequest(call, params, callback);
  }
};