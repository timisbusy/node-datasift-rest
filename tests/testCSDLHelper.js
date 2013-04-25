var DataSift = require('../index.js');

var options = {
  USERNAME: process.env.DATASIFT_USER, 
  API_KEY: process.env.DATASIFT_PASS 
}

var ds = new DataSift(options);

function pickId () {
  var id = Math.floor(Math.random() * 1000000);
  return id;
}

var ids = [];
var max_ids = 300;
for ( var i = 0; i < max_ids; i++ ) {
  ids.push(pickId());
}


ds.helpers.generateTwitterFollowHash(ids, function (err, data) {
  if (err) { throw err; }
  console.log(data);
});