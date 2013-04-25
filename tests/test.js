var DataSift = require('../index.js'),
    util = require('util');

var options = {
  USERNAME: process.env.DATASIFT_USER, 
  API_KEY: process.env.DATASIFT_PASS 
};

var ds = new DataSift(options);

ds.core.balance(function(err, data) {
  if (err) { throw err; }
  console.log("balance: " + util.inspect(data));
});

ds.core.dpu('10fc212ae500149af663f41374eaa359' ,function(err, data) {
  if (err) { throw err; }
  console.log("dpu: " + util.inspect(data));
});

ds.core.usage('day' ,function(err, data) {
  if (err) { throw err; }
  console.log("usage: " + util.inspect(data));
});

ds.core.stream('10fc212ae500149af663f41374eaa359' ,function(err, data) {
  if (err) { throw err; }
  console.log("stream: " + util.inspect(data));
});

var csdl = "twitter.text contains_phrase \"need a plumber\" or twitter.text contains_phrase \"know a plumber\" or twitter.text contains_phrase \"use a plumber\"";
ds.core.validate(csdl ,function(err, data) {
  if (err) { throw err; }
  console.log("stream validated: " + util.inspect(data));
});

ds.core.compile(csdl ,function(err, data) {
  if (err) { throw err; }
  console.log("stream compiled: " + util.inspect(data));
});