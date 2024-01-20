const express = require("express");
const router = express.Router();
const {
  createDeck,
  getDecks,
  getDeckById,
  editCardInDeck,
  addCardToDeck,
} = require("../controllers/deckController");
const authenticateMiddleware = require("../middleware/authentication");

const Deck = require("../models/deckModel");

router.post("/", createDeck);
router.post("/:deckId", addCardToDeck);

router.get("/", getDecks);
router.get("/:deckId", getDeckById);
router.put("/:deckId/cards/:cardId", editCardInDeck);

module.exports = router;
