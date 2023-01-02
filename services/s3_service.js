const { S3 } = require("aws-sdk");
var cfg = require("../config/cfg");

exports.s3Upload = async function(file, filename, empty) {
  const s3  = new S3();
  s3.config.update({ region: "ap-northeast-1" });

  var params = {};

  if (empty === true) {
    console.log("TASK3");
    params = {
      Bucket: cfg.s3.bucket,
      Key: cfg.s3.key.trigger + "Tr-" + filename + ".trg",
      Body: ""
    }
  } else {
    console.log("TASK1");
    params = {
      Bucket: cfg.s3.bucket,
      Key: cfg.s3.key.input + file.originalname,
      Body: file.buffer
    }
  }

  return await s3.upload(params).promise();
}
