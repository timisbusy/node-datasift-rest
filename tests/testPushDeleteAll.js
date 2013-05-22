var DataSift = require('../index.js'),
    util = require('util');

var options = {
  USERNAME: process.env.DATASIFT_USER, 
  API_KEY: process.env.DATASIFT_PASS 
};

var ds = new DataSift(options);

var pushOptions = require('./conf.js');


ds.push.get(function (err, data) {
  if (err) { return console.log('get failed.'); }
  console.log(data);
  if (data.subscriptions && data.subscriptions.length) {
    data.subscriptions.forEach(function (sub) {
      ds.push.delete(sub.id, function (err, data) {
        if (err) { return console.log('delete failed.'); }
        console.log(data);
      });
    });
  }
});