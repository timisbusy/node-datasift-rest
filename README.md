# datasift-rest

Node.js Wrapper for DataSift REST API.

### Note: Breaking Interface Change in 0.1.0

Does not callback with (err, res, data) as is the default in request. Now uses more normal (err, data) parameters.


## Install

    npm install datasift-rest

## Use

    var DataSift = require('datasift-rest');

    var options = {
      USERNAME: "MY_DATASIFT_USERNAME", // ex: joespizza
      API_KEY: "MY_DATASIFT_PASSWORD" // ex: 75368shgpauihawieyear754873
    };

    var ds = new DataSift(options);

    ds.core.balance(function(err, data) {
      if (err) { throw err; }
      console.log("balance: " + data);
    });

    var ids = [20731458, 18751623, 363450850];

    ds.helpers.generateTwitterFollowHash(ids, function (err, data) {
      if (err) { throw err; }
      console.log(data);
    });

## Core API Calls

More info for each call and additional options is available here: [DataSift Rest API Docs](http://dev.datasift.com/docs/rest-api)

### balance(cb)

Returns your current balance.

### compile(csdl, cb)

Compiles a csdl text and returns a hash and statistics like dpus.

### dpu(hash, cb)

Returns the dpu of the provided hash.

### stream(hash, options, cb)

Returns test data from the provided hash.

### usage(period, cb)

Returns data about usage in a certain period. Options: 'day', 'hour', 'current'

### validate(csdl, cb)

Verifies that a certain csdl is valid.

## Helper Calls

In addition to the core API calls, I've included a few helpers to build CSDLs for common use cases. These should be considered experimental and additions or revisions would be very welcome.

### generateHash(parameters, cb)

Generates a DataSift hash using a provided array of targeting parameters. Each parameter object should include a target, operator, and argument.

    { target: 'twitter.user.screen_name', operator: 'in', argument: ['timisbusy', 'brainflake', 'elbloombito'] }

### generateTwitterFollowHash(userIds, cb)

Generates a DataSift hash by creating a CSDL following tweets from the provided array of type: twitter.user.id.

### generateTwitterConversationFollowHash(userIds, cb)

Generates a DataSift hash by creating a CSDL following tweets from and mentioning the provided array of type: twitter.user.id.

### generateTwitterSearchHash(keywords, cb)

Generates a DataSift hash by creating a CSDL searching for tweets containing keywords in the provided array of strings.
