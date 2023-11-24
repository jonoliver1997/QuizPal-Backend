const express = require("express");
const router = express.Router();
const {
  createDeck,
  getDecks,
  getDeckById,
} = require("../controllers/deckController");

const Deck = require("../models/deckModel");

router.post("/", createDeck);

router.get("/", getDecks);

router.post("/", (req, res) => {
  res.send("Create a new deck");
});

router.get("/:id", (req, res) => {
  res.send("Get a deck by id");
});

module.exports = router;
