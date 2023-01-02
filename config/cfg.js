var env = process.env.NODE_ENV || "local"
  , cfg = require("./" + env);

module.exports = cfg;
