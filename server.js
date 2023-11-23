const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const deckRoutes = require("./routes/deckRoutes");

const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/decks", deckRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
