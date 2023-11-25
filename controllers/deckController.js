const Deck = require("../models/deckModel");
const mongoose = require("mongoose");

const getDecks = async (req, res) => {
  try {
    const decks = await Deck.aggregate([
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

    // Create a new deck with the provided title and cards
    const newDeck = new Deck({ title, cards });

    // Save the new deck to the database
    await newDeck.save();

    res.status(201).json(newDeck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params._id);

    res.json(deck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createDeck, getDecks, getDeckById };
