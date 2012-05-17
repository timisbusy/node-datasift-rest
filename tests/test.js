var DataSift = require('../index.js'),
    util = require('util');

var options = {
  USERNAME: "YOUR_USERNAME_HERE", // ex: "larryspizza"
  API_KEY: "YOUR_API_KEY_HERE" // ex: "236y1340681614361346agdq364"
};
var ds = new DataSift(options);

ds.core.balance(function(err, res, data) {
  console.log(err);
  //console.log(res);
  console.log("balance: " + util.inspect(data));
});

ds.core.dpu('10fc212ae500149af663f41374eaa359' ,function(err, res, data) {
  console.log(err);
  //console.log(res);
  console.log("dpu: " + util.inspect(data));
});

ds.core.usage('day' ,function(err, res, data) {
  console.log(err);
  //console.log(res);
  console.log("usage: " + util.inspect(data));
});

ds.core.stream('10fc212ae500149af663f41374eaa359' ,function(err, res, data) {
  console.log(err);
  //console.log(res);
  console.log("stream: " + util.inspect(data));
  //console.log("stream twitter: " + util.inspect(data.stream[0].twitter));
});

var csdl = "twitter.text contains_phrase \"need a plumber\" or twitter.text contains_phrase \"know a plumber\" or twitter.text contains_phrase \"use a plumber\"";
ds.core.validate(csdl ,function(err, res, data) {
  console.log(err);
  //console.log(res);
  console.log("stream validated: " + util.inspect(data));
  //console.log("stream twitter: " + util.inspect(data.stream[0].twitter));
});
ds.core.compile(csdl ,function(err, res, data) {
  console.log(err);
  //console.log(res);
  console.log("stream compiled: " + util.inspect(data));
  //console.log("stream twitter: " + util.inspect(data.stream[0].twitter));
});