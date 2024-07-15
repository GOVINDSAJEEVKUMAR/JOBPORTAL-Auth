const mongoose = require("mongoose");

const googleSchema = new mongoose.Schema({
    google:String,
    displayname:String,
    email:String,
    image:String
},{timestamps:true});

const userdb = mongoose.model("Google", googleSchema);

module.exports = userdb