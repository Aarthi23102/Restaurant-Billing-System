const mongoose = require("mongoose");
const Orders = new mongoose.Schema({
  amount: { type: Number, required: true },
  orderedItems: { type: Array, required: true },
  date: { type: Date, default: Date.now }
});


const model = mongoose.model('OrdersData', Orders);
module.exports = model