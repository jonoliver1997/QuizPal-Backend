const Deck = require("../models/deckModel");
const mongoose = require("mongoose");

const getDecks = async (req, res) => {
  try {
    const userId = req.user._id;

    const decks = await Deck.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          title: 1,
          numberOfCards: { $size: "$cards" },
        },
      },
    ]);

    res.json(decks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDeck = async (req, res) => {
  try {
    const { title, cards } = req.body;
    const userId = req.user._id;
    // Create a new deck with the provided title and cards
    const newDeck = new Deck({ title, cards, userId });

    // Save the new deck to the database
    await newDeck.save();

    res.status(201).json(newDeck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDeckById = async (req, res) => {
  try {
    const userId = req.user._id;
    const deck = await Deck.findOne({
      _id: req.params.id,
      userId: userId,
    });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.json(deck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createDeck, getDecks, getDeckById };
