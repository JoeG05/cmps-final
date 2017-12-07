var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var dbuser = process.env.DB_USER;
var dbpass = process.env.DB_PASSWORD;
var url = 'mongodb://' + dbuser + ':' + dbpass + '@ds133136.mlab.com:33136/contacts';

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
