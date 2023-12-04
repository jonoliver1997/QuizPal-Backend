const Deck = require("../models/deckModel");
const mongoose = require("mongoose");

const getDecks = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("Fetching decks for user ID: ", userId);

    if (!(userId instanceof mongoose.Types.ObjectId)) {
      userId = mongoose.Types.ObjectId(userId.toString());
    }

    const decks = await Deck.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $project: {
          title: 1,
          numberOfCards: { $size: "$cards" },
        },
      },
    ]);

    console.log("Decks fetched: ", decks);

    res.json(decks);
  } catch (err) {
    console.error("Error fetching decks: ", err);
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
      _id: req.params.deckId,
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

const editCardInDeck = async (req, res) => {
  try {
    const userId = req.user._id;
    const { deckId, cardId } = req.params;
    const { front, back } = req.body;

    const deck = await Deck.findOneAndUpdate(
      { _id: deckId, userId: userId, "cards._id": cardId },
      {
        $set: {
          "cards.$.front": front,
          "cards.$.back": back,
        },
      },
      { new: true }
    );

    if (!deck) {
      return res.status(404).json({ message: "Deck or Card not found" });
    }

    res.json(deck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDeck,
  getDecks,
  getDeckById,
  editCardInDeck,
};
