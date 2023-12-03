const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwtSecret = process.env.JWT_SECRET || "secret";
const mongoose = require("mongoose");

// @desc: Register a new user
// @route: POST /users/register
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc: Authenticate a user
// @route: POST /users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Check if the password is correct
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token,
  });
});

// @desc: Get all users
// @route: GET /users
// @access: Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  console.log(users);
  res.status(200).json(users);
});

// @desc: Get user data
// @route: GET /users/:id
// @access: Private
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  // Find the user by ID in the database
  const user = await User.findById(userId);

  // Check if the user exists
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

module.exports = { registerUser, loginUser, getUsers, getUser };