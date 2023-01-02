var express = require("express");
var router = express.Router();
const multer = require("multer");
const { s3Upload } = require("../../services/s3_service");
const { sqsSend } = require("../../services/sqs_service");
const uuid = require("uuid").v4;

const task1 = "File upload to S3";
const task2 = "Trigger SQS";
const task3 = "Empty file upload to S3";

const storage = multer.memoryStorage();

// File type check
const fileFilter = function(req, file, next) {
  if (file.mimetype === "text/csv") {
    next(null, true);
  } else {
    next(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
}

// TODO: File larger than 50MB will req. different strategy -> diskStorage + multipart upload to S3
// Limiting file size to 50MB for PoC
const upload = multer(
  {
    storage,
    fileFilter, 
    limits: { fileSize: 52428800}   // 50 MB
  }
);

/* POST from javascript client */
router.post("/", upload.single("file"), async function(req, res, next) {
  var requestID = uuid();
  var result = [];
  console.log(req.file);
  const resp = await callTasks(req.file, requestID);
  console.log(resp);

  // iterate over resp keys into result
  Object.keys(resp).forEach(function(key) {
    if (resp[key]) result.push(resp[key]);
  });
  
  // return result
  res.json({
    "RequestID": requestID,
    "Result": result
  });
});

// call tasks sequentially
async function callTasks(file, requestID) {
  var result = {
    "task1": null,
    "task2": null,
    "task3": null
  };

  // 1. File upload to S3
  try {
    const resp = await s3Upload(file, null, false);
    // need only necessary items
    delete resp["key"];
    delete resp["ETag"];
    result.task1 = {
      "Task": task1,
      "Status": "SUCCESS",
      "Details": JSON.stringify(resp, null, 2)
    };
  } catch(error) {
    result.task1 = {
      "Task": task1,
      "Status": "FAIL",
      "Details": error.message
    }
    return result;
  }
  
  // 2. SQS
  const body = JSON.stringify(
    {
      "requestID": requestID,
      "filename": file.originalname 
    }
  );
  try {
    const resp = await sqsSend(JSON.stringify(body));
    result.task2 = {
      "Task": task2,
      "Status": "SUCCESS",
      "Details": JSON.stringify(resp, null, 2)
    }
  } catch (error) {
    result.task2 = {
      "Task": task2,
      "Status": "FAIL",
      "Details": error.message
    }
    return result;
  }

  // 3. Trigger file upload to S3
  try {
    const resp = await s3Upload(null, file.originalname, true);
    // need only necessary items
    delete resp["key"];
    delete resp["ETag"];
    result.task3 = {
      "Task": task3,
      "Status": "SUCCESS",
      "Details": JSON.stringify(resp, null, 2)
    }
  } catch (error) {
    result.task3 = {
      "Task": task3,
      "Status": "FAIL",
      "Details": error.message
    }
  }

  return result;
}

module.exports = router;
