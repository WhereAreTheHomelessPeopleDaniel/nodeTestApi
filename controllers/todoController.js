var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to the database
mongoose
  .connect("mongodb://tazdingo:d4n131123@ds159812.mlab.com:59812/orders")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });

//Create schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now },
  dateFinished: { type: String, default: "1.1.1979" },
  drink: String
});

var Orders = mongoose.model("Orders", todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app) {
  app.get("/orders", function(req, res) {
    //get data from mongodb and pass it to the view
    Orders.find({}, function(err, data) {
      if (err) throw err;
      console.log(data);
      res.setHeader("content-type", "application/javascript");
      res.send(JSON.stringify(data));
    }); //prazdny objekt vrati vsechny --- item: value vrati pouze item ktery matchne
  });
  app.post("/orders", urlencodedParser, function(req, res) {
    //get data from the view and add it to mongodb
    var newOrder = Orders(req.body).save(function(err, data) {
      console.log(Orders(req.body));
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete("/orders/:_id", function(req, res) {
    //delete the requested item from mongodb
    Orders.find({ _id: req.params._id }).deleteOne(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
};
