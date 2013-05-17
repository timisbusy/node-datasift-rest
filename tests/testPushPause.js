var DataSift = require('../index.js'),
    util = require('util');

var options = {
  USERNAME: process.env.DATASIFT_USER, 
  API_KEY: process.env.DATASIFT_PASS 
};

var ds = new DataSift(options);

var pushOptions = require('./conf.js');

var created;

ds.push.create(pushOptions, function (err, data) {
  if (err) { return console.log('creation failed.'); }
  console.log('created');
  created = data;
  ds.push.pause(created.id, function (err, data) {
    if (err) { return console.log('pause failed.'); }
    console.log('paused');
    console.log(data);
    setTimeout(function () {
      ds.push.resume(created.id, function (err, data) {
        if (err) { return console.log('resume failed.'); }
        console.log('resumed');
        console.log(data);
        setTimeout(function () {
          ds.push.delete(created.id, function (err, data) {
            if (err) { return console.log('delete failed.'); }
            console.log('deleted');
            console.log(data);
            ds.push.get(function (err, data) {
              if (err) { return console.log('get failed.'); }
              console.log('got ', data);
            });
          });
        }, 3000);
      });
    }, 3000);
  });
});

ds.push.log(function (err, data) {
  if (err) { return console.log('log failed.'); }
  console.log(data);
});
