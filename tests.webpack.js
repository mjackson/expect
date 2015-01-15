var context = require.context('./tests', true, /-test\.js$/);
context.keys().forEach(context);
