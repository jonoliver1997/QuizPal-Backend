const express = require("express");
const router = express.Router();
const {
  createDeck,
  getDecks,
  getDeckById,
} = require("../controllers/deckController");
const authenticateMiddleware = require("../middleware/authentication");

const Deck = require("../models/deckModel");

router.post("/", authenticateMiddleware, createDeck);

router.get("/", getDecks);
router.get("/:id", getDeckById);

module.exports = router;
