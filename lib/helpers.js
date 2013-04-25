var _ = require('underscore');

module.exports = {
  generateHash: function generateHash (parameters, callback) {
    var core = this.core;
    var max_chars = 6060;
    var chunks = [];

    var CSDL = "";
    while (parameters.length > 0) {
      var newLine = parameters[0].target + ' ' + parameters[0].operator + ' ' + parameters[0].argument;
      if(CSDL.length + newLine.length > max_chars){
        if (CSDL.length > 0) {
          chunks.push(CSDL);
          CSDL = "";
        }

        if (newLine.length > max_chars) {
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
      core.validate(CSDL, function (err, res, data) {
        if (err) { 
          callback(err);
        } else {
          core.compile(CSDL, callback);
        }
      });
    } else {
      var compiled = 0;
      var totalChunks = chunks.length;
      var hashes = [];
      _.each(chunks, function (chunk) {
        var CSDL = chunk;
        core.compile(CSDL, function (err, res, data) {
          if (err) {
            callback(err);
          } else {
            compiled++;
            hashes.push(data.hash);
            if (compiled === totalChunks) {
              var compiledCSDL = "";
              var totalHashes = hashes.length;
              _.each(hashes, function (hash, index) {
                compiledCSDL += 'stream \"' + hash + '\"';
                if (index < totalHashes - 1) {
                  compiledCSDL += ' or '
                }
              });
              core.compile(compiledCSDL, callback);
            }
          }
        });
      });
    } 
  },
  generateTwitterFollowHash: function generateTwitterFollowHash (userIds, callback) {
    var parameters = [{ target: 'twitter.user.id', operator: 'in', argument: '[' + userIds.toString() + ']' }];
    this.generateHash(parameters, callback);
  },
  generateTwitterConversationFollowHash: function generateTwitterFollowHash (userIds, callback) {
    var parameters = [{ target: 'twitter.user.id', operator: 'in', argument: '[' + userIds.toString() + ']' }, { target: 'twitter.mention_ids', operator: 'in', argument: '[' + userIds.toString() + ']' }];
    this.generateHash(parameters, callback);
  },
  generateTwitterSearchHash: function generateTwitterHash (keywords, callback) {
    var parameters = [{ target: 'twitter.text', operator: 'contains_any', argument: '\"' + keywords.toString() + '\"'}];
    this.generateHash(parameters, callback);
  }

}


function splitLine (line) {
  var max_chars = 6050;
  var target = line.target;
  var operator = line.operator;
  var argument = line.argument;

  var lines = [];
  var newLine = {
    target: target,
    operator: operator,
    argument: ""
  };

  var keywordsSplit = argument.split(',');

  while (keywordsSplit.length > 0) {
    if(target.length + operator.length + newLine.argument.length + keywordsSplit[0].length + 2 > max_chars){
      lines.push({
        target: target,
        operator: operator,
        argument: newLine.argument
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

  lines.push(newLine);
  return lines;
}