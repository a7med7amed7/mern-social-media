const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const verifyToken = require("../verifyToken");

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ message: "Account updated successfully", user });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You can only update your account." });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Account deleted successfully", user });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You can only delete your account." });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, createdAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!followedUser.followers.includes(req.body.userId)) {
        await followedUser.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        res.status(200).json({ message: "Followed" });
      } else {
        res
          .status(403)
          .json({ message: `You are already follow ${followedUser.username}` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You cannot follow yourself!" });
  }
});

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const unFollowedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (unFollowedUser.followers.includes(req.body.userId)) {
        await unFollowedUser.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        res.status(200).json({ message: "Unfollowed" });
      } else {
        res.status(403).json({
          message: `You are already unfollowed ${unFollowedUser.username}`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You cannot unfollow yourself!" });
  }
});

router.get("/:id/followers", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userFollowers = await Promise.all(
      user.followers.map(async (u) => {
        const tempUser = await User.findById(u);
        const {
          email,
          password,
          coverPicture,
          followers,
          followings,
          isAdmin,
          createdAt,
          updatedAt,
          ...others
        } = tempUser._doc;
        return others;
      })
    );
    res.json(userFollowers);
  } catch (err) {
    console.log(err);
  }
});

router.get("/random-users", async (req, res) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 7 } }]);
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    await User.find(
      { username: { $regex: req.query.q, $options: "i" } },
      (err, data) => {
        res.status(200).json(data);
      }
    ).limit(7);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
