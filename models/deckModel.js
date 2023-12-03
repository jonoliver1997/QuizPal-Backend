const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
});

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  cards: [cardSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

deckSchema.index({ title: 1 });
// if i use title: "text" i can use $text search

deckSchema.index({ cards: 1 });

module.exports = mongoose.model("Deck", deckSchema);
