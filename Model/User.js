const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  currentPrice: Number,
  date: Date,
});
const dataSchema = mongoose.Schema({
  title: String,
  vendor: String,
  url: { type: String },
  target_price: Number,
  current_price: [{ type: Number }],
  dateArray: [{ type: String }],
  date: { type: Date, default: Date.now },
  pricedrop: Boolean,
  notified: Boolean,
  error: {
    type: Number,
    default: 0,
  },
});
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetLink: {
    type: String,
    default: "",
  },
  Data: [dataSchema],
  notificationCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", userSchema);
