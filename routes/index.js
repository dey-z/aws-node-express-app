var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", 
    { h1_1: "Express Web APP",
      h1_2: "Upload csv to AWS S3 and trigger AWS services sequentially"
    });
});

module.exports = router;
