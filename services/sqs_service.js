const { SQS } = require("aws-sdk");
var cfg = require("../config/cfg");

exports.sqsSend = async function(body) {
  console.log("TASK2");
  const sqs = new SQS();
  sqs.config.update({ region: "ap-northeast-1" });

  const params = {
    MessageBody: body,
    QueueUrl: cfg.sqs.url
  }

  return await sqs.sendMessage(params).promise();
}
