var burger = require("../models/burger.js");
var express = require("express");

var router = express.Router();
// console.log("connected to controller");
router.get('/', function(req, res){
  res.redirect('/index');
});

router.get("/index", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
  
router.post("/burgers/new", function(req, res) {
  burger.insertOne(req.body.burger_name, function(result) {
    res.redirect("/index");
  });
});

router.post("/burgers/:id", function(req, res) {
  burger.updateOne({
    id: req.params.id
  }, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    res.redirect("/index");
  });
});

module.exports = router;