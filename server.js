const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const passport = require("passport");

const deckRoutes = require("./routes/deckRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticateMiddleware = require("./middleware/authentication");

const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/decks", authenticateMiddleware, deckRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
