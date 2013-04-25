var _ = require('underscore');

module.exports = {
  balance: function balance(callback) {
    var call = "balance";
    this.sendRequest(call, this.vars, callback);
  },
  compile: function compile(csdl, callback){
    var call = "compile";
    var addParams = {
      csdl: csdl
    }
    var params = _.extend(this.vars, addParams);
    this.sendRequest(call, params, callback);
  },
  dpu: function dpu(hash, callback){
    var call = "dpu";
    var addParams = {
      hash: hash
    }
    var params = _.extend(this.vars, addParams);
    this.sendRequest(call, params, callback);
  },
  stream: function stream(hash, options, callback){
    var call = "stream";
    var addParams = {
      hash: hash
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.vars, addParams);
    this.sendRequest(call, params, callback);
  },
  usage: function usage(period, callback){
    var call = "usage";
    var addParams = {
      period: period
    }
    var params = _.extend(this.vars, addParams);
    this.sendRequest(call, params, callback);
  },
  validate: function validate(csdl, callback){
    var call = "validate";
    var addParams = {
      csdl: csdl
    }
    var params = _.extend(this.vars, addParams);
    this.sendRequest(call, params, callback);
  }
};