module.exports = {
  validate: function validate (options, callback) {
    var call = "push/validate";
    this.sendRequest(call, options, callback);
  },
  create: function create (options, callback) {
    var call = "push/create";
    this.sendRequest(call, options, callback);
  },
  pause: function pause (id, options, callback) {
    var call = "push/pause";
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options.id = id;
    this.sendRequest(call, options, callback);
  },
  resume: function resume (id, options, callback) {
    var call = "push/resume";
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options.id = id;
    this.sendRequest(call, options, callback);
  },
  update: function update (id, options, callback) {
    var call = "push/update";
    options.id = id;
    this.sendRequest(call, options, callback);
  },
  stop: function stop (id, options, callback) {
    var call = "push/stop";
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options.id = id;
    this.sendRequest(call, options, callback);
  },
  "delete": function (id, options, callback) {
    var call = "push/delete";
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options.id = id;
    this.sendRequest(call, options, callback);
  },
  log: function log (options, callback) {
    var call = "push/log";
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.sendRequest(call, options, callback);
  },
  get: function get (options, callback) {
    var call = "push/get";
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.sendRequest(call, options, callback);
  }
};