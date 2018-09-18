var express = require("express");
var todoController = require("./controllers/todoController");

var app = express();

//set up template engine
//app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

// add CORS for outside domain access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//fire controllers
todoController(app);

//listen to port
const port = process.env.PORT || 301;
app.listen(port, function() {
  console.log("listening to port 301");
});
