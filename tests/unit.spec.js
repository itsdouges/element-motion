const context = require.context("../src", true, /.spec$/);
context.keys().forEach(context);
