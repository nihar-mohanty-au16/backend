const generateToken = require("../util/generateToken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const register = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email }); //checking if user exists

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      username: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Error happened");
  }

  //   res.json({
  //     username,
  //     email,
  //   });
};

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      username: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = { register, authUser };
