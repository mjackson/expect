var inspect = require('object-inspect');

function invariant(condition, messageFormat) {
  if (condition)
    return;
    
  var extraArgs = Array.prototype.slice.call(arguments, 2);
  var index = 0;

  var message = messageFormat.replace(/%s/g, function () {
    return inspect(extraArgs[index++]);
  });

  throw new Error(message);
}

module.exports = invariant;
