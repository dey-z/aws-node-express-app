const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
var cfg = require("../config/cfg");

exports.sqsSend = async function(body) {
  const sqs = new SQSClient({ region: "ap-northeast-1" });

  const params = {
    MessageBody: body,
    QueueUrl: cfg.sqs.url
  }

  return await sqs.send(new SendMessageCommand(params));
}
