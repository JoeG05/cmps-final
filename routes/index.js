var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/contacts';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET mailer page
router.get("/mailer", function(req, res, next) {
  res.render("mailer");
});

router.post("/mailer", function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    var dbase=db.db("contacts");
    dbase.collection("people").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 record inserted");
      db.close();
    })
  });
  


  res.render("thanks", {name: req.body.firstName});
})

module.exports = router;
