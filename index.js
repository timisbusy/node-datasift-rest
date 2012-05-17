var request = require('request'),
    qs = require('qs'),
    util = require('util'),
    _ = require('underscore');

function DataSift(options){
  if(!options) { throw new Error('You must include your USERNAME and API_KEY in options'); }
  this.username = options.USERNAME;
  this.api_key = options.API_KEY;
  this.vars = {
    username: this.username,
    api_key: this.api_key
  }

  this.core.vars = this.vars;
  this.core.sendRequest = this.sendRequest;
};


DataSift.prototype.core = {
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

DataSift.prototype.sendRequest = function sendRequest(call, params, callback){
  var params = _.extend(this.vars, params); 
  request.post({
    headers: { 
      'content-type': 'application/x-www-form-urlencoded' 
    },
    url: "http://api.datasift.com/" + call + "?" + qs.stringify(params),
    body: qs.stringify(params),
    form: true
  }, function(err, res, data){
    if (err) { 
      console.log('error here');
      callback(err);
    } else {
      data = JSON.parse(data);
      callback(null, res, data);
    }
  });
};

function DataSiftError (errors) {
  Error.captureStackTrace(this, DataSiftError); 
  this.errors = errors;
}

util.inherits(DataSiftError, Error); 

DataSift.prototype.toString = function toString (){
  var arr = [];
  _.each(this.errors, function (error) {
    arr.push(util.inspect(error));
  });
  return "DataSiftError: " + arr.join('\n');
}

module.exports = DataSift;