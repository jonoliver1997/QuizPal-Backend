const express = require("express");
const router = express.Router();

const Deck = require("../models/deckModel");

router.post("/", async (req, res) => {
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
});

router.get("/", async (req, res) => {
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
});

router.post("/", (req, res) => {
  res.send("Create a new deck");
});

router.get("/:id", (req, res) => {
  res.send("Get a deck by id");
});

module.exports = router;
