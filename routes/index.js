var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var dbuser = process.env.DB_USER;
var dbpass = process.env.DB_PASSWORD;
var url = 'mongodb://' + dbuser + ':' + dbpass + '@ds133856.mlab.com:33856/final';

var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',
  apiKey: 'AIzaSyANpmFb2U9rjGAIaClkoTMJms8iOUE67XA',
  formatter: null
};

var geocoder = NodeGeocoder(options);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET mailer page
router.get("/mailer", function(req, res, next) {
  res.render("mailer");
});

// POST mailer page
router.post("/mailer", function(req, res, next) {
  
  MongoClient.connect(url, function(err, db) {
    var dbase=db.db("final");
    var contact = {};
    var name = req.body.firstName + " " + req.body.lastName;
    contact.address = req.body.street + " " + req.body.city + " " + req.body.state + " " + req.body.zip;
    if (req.body.title) {
      contact.name=req.body.title + " " + name;
    } else {
      contact.name=name;
    }
    contact.phone=req.body.phone;
    contact.email=req.body.email;
    contact.cbPhone=req.body.cbPhone;
    contact.cbEmail=req.body.cbEmail;
    contact.cbMail=req.body.cbMail;
    contact.any=req.body.any;
    geocoder.geocode(contact.address, function(err, res) {
      contact.lat=res[0].latitude;
      contact.long=res[0].longitude;
      console.log(contact);
    });
    dbase.collection("contacts").insertOne(contact, function(err, res) {
      if (err) throw err;
      console.log("1 record inserted");
      db.close();
    })
  });
  res.render("thanks", {name: req.body.firstName});
})

// GET contacts page
router.get("/contacts", function(req, res, next) {
  let contact;
  MongoClient.connect(url, function(err, db) {
    var dbase=db.db("final");
    dbase.collection("contacts").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.render("contacts", {people: result});
    })
  });
})
module.exports = router;
