var config = module.exports = {};

config.env = "local";

config.s3 = {}
config.s3.bucket = "<bucket-name>";
config.s3.key = {}
config.s3.key.input = "input/";
config.s3.key.trigger = "trigger/";
config.sqs = {}
config.sqs.url = "https://<url>/<sqs-name>";

module.exports = config;
