const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  _id: String,
  name: String,
  typeInvitation: Boolean,
  attendance: Boolean,
  seen: Boolean,
  body: String,
});

const Family = mongoose.model("family", familySchema);

module.exports = Family;
