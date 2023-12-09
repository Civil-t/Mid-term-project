const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  login: Number,
  ticket: Number,
  openTime: String,
  type: String,
  volume: Number,
  symbol: String,
  openPrice: Number,
  sl: Number,
  tp: Number,
  closeTime: String,
  closePrice: Number,
  swaps: Number,
  profit: Number,
});

const TradesModel = mongoose.model("trades", DataSchema);

module.exports = TradesModel;
