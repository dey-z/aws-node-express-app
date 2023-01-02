var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var processingRouter = require("./routes/api/processing");

var cfg = require("./config/cfg");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * frontend routing
 */
// redirecting base route to /index
app.get("/", (req, res) => {
  res.redirect("/index");
});
// form route
app.use("/index", indexRouter);

/**
 * backend routing
 */
app.use("/api/processing", processingRouter);

/**
 * error handling
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // pick up multer errors/api errors to separate and provide to client rendered as json
  // api errors should have status 400
  if (req.url === "/api/processing") {
    var messg = err.message
    // can custom handle for other error codes as well
    if (err.code === "LIMIT_FILE_SIZE") {
      messg = messg + " should be less than equal to 50MB"
    }
    // return JSON
    return res.status(400).json({
      message: messg
    })
  }

  // Below is routing for page errors 404 etc.
  // set locals, only providing error in development/local
  // return error html
  res.locals.message = err.message;
  // var env = req.app.get("env");
  // console.log(env);
  if ((cfg.env === "development") || (cfg.env === "local")) {
    res.locals.error = err;
  } else {
    err.stack = null;
    res.locals.error = err;
  }
  
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
