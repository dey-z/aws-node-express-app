var config = module.exports = {};

config.env = "development";

config.s3 = {}
config.s3.bucket = "";
config.s3.key = {}
config.s3.key.input = "/";
config.s3.key.trigger = "/";
config.sqs = {}
config.sqs.url = "";

module.exports = config;
