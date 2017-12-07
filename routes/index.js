var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var dbuser = process.env.DB_USER;
var dbpass = process.env.DB_PASSWORD;
var url = 'mongodb://' + dbuser + ':' + dbpass + '@ds133856.mlab.com:33856/final';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET mailer page
router.get("/mailer", function(req, res, next) {
  console.log(url);
  res.render("mailer");
});

// POST mailer page
router.post("/mailer", function(req, res, next) {
  
  MongoClient.connect(url, function(err, db) {
    var dbase=db.db("final");
    dbase.collection("contacts").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 record inserted");
      db.close();
    })
  });
  res.render("thanks", {name: req.body.firstName});
})

// GET contacts page
router.get("/contacts", function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    var contact;
    var dbase=db.db("final");
    dbase.collection("contacts").find({}).toArray(function(err, result) {
      console.log(result);
      if (err) throw err;
      db.close();
    })
  });
  res.render("contacts", {people: result});
})
module.exports = router;
