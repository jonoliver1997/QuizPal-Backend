const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all decks");
});

router.post("/", (req, res) => {
  res.send("Create a new deck");
});

router.get("/:id", (req, res) => {
  res.send("Get a deck by id");
});
