const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const routes = express.Router();
routes.post(
  "/register",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    try {
      const body = req.body;
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);

      const user = await new User({
        ...body,
      });
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(200).json(err);
    }
  }
);

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, "mySecretKey", {
    expiresIn: "5s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, "myRefreshSecretKey", {
    expiresIn: "7d",
  });
};

routes.post(
  "/login",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json({ message: "User not found" });

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      !isValidPassword && res.status(400).json({ message: "Wrong password" });
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const { password, createdAt, ...userData } = user._doc;
      res.status(200).json({ userData, accessToken });
    } catch (err) {
      res.status(200).json(err);
    }
  }
);
module.exports = routes;
