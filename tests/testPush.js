var DataSift = require('../index.js'),
    util = require('util');

var options = {
  USERNAME: process.env.DATASIFT_USER, 
  API_KEY: process.env.DATASIFT_PASS 
};

var ds = new DataSift(options);

var pushOptions = require('./conf.js');

ds.push.validate(pushOptions, function (err, data) {
  if (err) { return console.log('validation failed.'); }
  console.log('validated');
});

ds.push.create(pushOptions, function (err, data) {
  if (err) { return console.log('creation failed.'); }
  console.log('created');

  ds.push.get(function (err, data) {
    if (err) { return console.log('get failed.'); }
    console.log(data);
    if (data.subscriptions && data.subscriptions.length) {
      ds.push.delete(data.subscriptions[0].id, function (err, data) {
        if (err) { return console.log('delete failed.'); }
        console.log(data);
      });
    }
  });
});

ds.push.log(function (err, data) {
  if (err) { return console.log('log failed.'); }
  console.log(data);
});
