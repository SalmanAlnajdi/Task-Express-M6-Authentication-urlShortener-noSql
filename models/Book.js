const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 50 },
});

module.exports = mongoose.model("book", bookSchema);
