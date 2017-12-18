var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    address: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    email: String,
    cbPhone: Boolean,
    cbEmail: Boolean,
    cbMail: Boolean,
    any: Boolean,
    lat: String,
    lng: String
});

module.exports = mongoose.model("Contact", contactSchema);