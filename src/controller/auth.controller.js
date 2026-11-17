const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const emailService = require("../services/email.service");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ name }, { email }],
  });

  if (isUserExist) {
    return res.status(400).json({
      Message: "User already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  await emailService.sendRegistrationEmail(user.email, user.name);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      Message: "User does not exist",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      Message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

module.exports = { registerUser, loginUser };
