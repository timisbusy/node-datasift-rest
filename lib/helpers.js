var MAX_CSDL_CHARS = 6060;

module.exports = {
  generateHash: function generateHash (parameters, callback) {
    var core = this.core;
    this.generateCSDL(parameters, function (err, CSDL) {
      if (err) { return callback(err); }
      core.compile(CSDL, callback);
    });
  },
  generateSampledHash: function generateSampledHash (parameters, samplingPercent, callback) {
    var core = this.core;
    var sampleAddition = ' and interaction.sample < ' + samplingPercent;
    this.generateCSDL(parameters, function (err, CSDL) {
      if (err) { return callback(err); }
      if (CSDL.length + sampleAddition > MAX_CSDL_CHARS) {
        core.compile(CSDL, function (err, data) {
          if (err) { return callback(err); }
          CSDL = 'stream \"' + hash + '\"' + sampleAddition;
          console.log(CSDL);
          core.compile(CSDL, callback);
        });
      } else {
        CSDL += sampleAddition;
        core.compile(CSDL, callback);
      }
    });
  },
  generateCSDL: function generateCSDL (parameters, callback) {
    var core = this.core;
    var chunks = [];

    var CSDL = "";
    while (parameters.length > 0) {
      var newLine = parameters[0].target + ' ' + parameters[0].operator + ' ' + parameters[0].argument;
      if(CSDL.length + newLine.length > MAX_CSDL_CHARS){
        if (CSDL.length > 0) {
          chunks.push(CSDL);
          CSDL = "";
        }

        if (newLine.length > MAX_CSDL_CHARS) {
          var newLines = splitLine(parameters.splice(0,1)[0]);
          parameters = newLines.concat(parameters);
        }

      } else {
        if (CSDL.length > 0) {
          CSDL += " or " + newLine;
        } else {
          CSDL += newLine;
        }
        parameters.splice(0,1);
      }  
    }
    chunks.push(CSDL);
    if(chunks.length === 1){
      var CSDL = chunks[0];
      core.validate(CSDL, function (err, data) {
        if (err) { 
          callback(err);
        } else {
          callback(null, CSDL);
        }
      });
    } else {
      var compiled = 0;
      var totalChunks = chunks.length;
      var hashes = [];
      chunks.forEach(function (chunk) {
        var CSDL = chunk;
        core.compile(CSDL, function (err, data) {
          if (err) {
            callback(err);
          } else {
            compiled++;
            hashes.push(data.hash);
            if (compiled === totalChunks) {
              var compiledCSDL = "";
              var totalHashes = hashes.length;
              hashes.forEach(function (hash, index) {
                compiledCSDL += 'stream \"' + hash + '\"';
                if (index < totalHashes - 1) {
                  compiledCSDL += ' or '
                }
              });
              callback(null, compiledCSDL);
            }
          }
        });
      });
    }
  },
  generateTwitterFollowHash: function generateTwitterFollowHash (userIds, sampling, callback) {
    var parameters = [{ target: 'twitter.user.id', operator: 'in', argument: '[' + userIds.toString() + ']' }];
    if (typeof sampling === 'function') {
      this.generateHash(parameters, sampling);
    } else {
      this.generateSampledHash(parameters, sampling, callback);
    }
  },
  generateTwitterConversationFollowHash: function generateTwitterFollowHash (userIds, sampling, callback) {
    var parameters = [{ target: 'twitter.user.id', operator: 'in', argument: '[' + userIds.toString() + ']' }, { target: 'twitter.mention_ids', operator: 'in', argument: '[' + userIds.toString() + ']' }];
    if (typeof sampling === 'function') {
      this.generateHash(parameters, sampling);
    } else {
      this.generateSampledHash(parameters, sampling, callback);
    }
  },
  generateTwitterSearchHash: function generateTwitterSearchHash (keywords, sampling, callback) {
    var parameters = [{ target: 'twitter.text', operator: 'contains_any', argument: '\"' + keywords.toString() + '\"'}];
    if (typeof sampling === 'function') {
      this.generateHash(parameters, sampling);
    } else {
      this.generateSampledHash(parameters, sampling, callback);
    }
  },
  generateFacebookFollowHash: function generateFacebookFollowHash (userIds, sampling, callback) {
    var parameters = [{ target: 'facebook.author.id', operator: 'in', argument: '\"' + userIds.toString() + '\"' }];
    if (typeof sampling === 'function') {
      this.generateHash(parameters, sampling);
    } else {
      this.generateSampledHash(parameters, sampling, callback);
    }
  },
  generateFacebookConversationFollowHash: function generateFacebookConversationFollowHash (userIds, sampling, callback) {
    var parameters = [{ target: 'facebook.author.id', operator: 'in', argument: '\"' + userIds.toString() + '\"' }, { target: 'facebook.to.ids', operator: 'in', argument: '\"' + userIds.toString() + '\"' }];
    if (typeof sampling === 'function') {
      this.generateHash(parameters, sampling);
    } else {
      this.generateSampledHash(parameters, sampling, callback);
    }
  },
  generateFacebookSearchHash: function generateFacebookSearchHash (keywords, sampling, callback) {
    var parameters = [{ target: 'facebook.message', operator: 'contains_any', argument: '\"' + keywords.toString() + '\"'}];
    if (typeof sampling === 'function') {
      this.generateHash(parameters, sampling);
    } else {
      this.generateSampledHash(parameters, sampling, callback);
    }
  }

}


function splitLine (line) {
  var target = line.target;
  var operator = line.operator;
  var initialChar = line.argument.substring(0, 1);
  var lastChar = line.argument.substring(line.argument.length - 1, line.argument.length);
  var argument = line.argument.substring(1, line.argument.length - 1);

  var lines = [];
  var newLine = {
    target: target,
    operator: operator,
    argument: ""
  };

  var keywordsSplit = argument.split(',');
  while (keywordsSplit.length > 0) {
    if(target.length + operator.length + newLine.argument.length + keywordsSplit[0].length + 10 > MAX_CSDL_CHARS){
      lines.push({
        target: target,
        operator: operator,
        argument: initialChar + newLine.argument + lastChar
      });
      newLine.argument = "";
    }
    if (newLine.argument.length === 0) {
      newLine.argument += keywordsSplit[0];
      keywordsSplit.splice(0,1); 
    } else {
      newLine.argument += ',' + keywordsSplit[0];
      keywordsSplit.splice(0,1); 
    }
  }
  newLine.argument = initialChar + newLine.argument + lastChar;
  lines.push(newLine);

  return lines;
}