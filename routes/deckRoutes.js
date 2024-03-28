const express = require("express");
const router = express.Router();
const {
  createDeck,
  getDecks,
  getDeckById,
  editCardInDeck,
  addCardToDeck,
  deleteDeck,
} = require("../controllers/deckController");
const authenticateMiddleware = require("../middleware/authentication");

const Deck = require("../models/deckModel");

router.use(authenticateMiddleware);

router.post("/", createDeck);
router.post("/:deckId", addCardToDeck);

router.get("/", getDecks);
router.get("/:deckId", getDeckById);
router.delete("/:deckId", deleteDeck);
router.put("/:deckId/cards/:cardId", editCardInDeck);

module.exports = router;
