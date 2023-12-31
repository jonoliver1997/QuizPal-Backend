const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
