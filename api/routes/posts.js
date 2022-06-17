const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const redis = require("redis");
router.post("/", async (req, res) => {
  const post = await new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Your post has been updated." });
    } else {
      res.status(403).json({ message: "You can update only your posts." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ message: "Your post has been deleted." });
    } else {
      res.status(403).json({ message: "You can delete only your posts." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      console.log(post, req.body.userId);
      await post.updateOne({ $push: { likes: req.body.userId } });
      console.log(post);

      res.status(200).json({ message: "Liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "Unliked" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const followingsPosts = await Promise.all(
      currentUser.followings.map((entityId) => {
        return Post.find({ userId: entityId });
      })
    );
    console.log(followingsPosts);
    res.status(200).json([...followingsPosts]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json([posts]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/comment", async (req, res) => {
  const comment = await new Comment(req.body);
  const post = await Post.findById(req.body.postId);
  try {
    const savedComment = await comment.save();
    await post.updateOne({ $push: { comments: savedComment._id } });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});

router.get("/comment/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
  }
});

router.put("/comment/vote/:id/:type", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.params.type == "up") {
      if (!comment.votes.includes([req.body.userId, 1])) {
        //await comment.updateOne({ $push: { upvotes: req.body.userId } });
        await comment.updateOne({ $pull: { votes: [req.body.userId, -1] } });
        await comment.updateOne({ $push: { votes: [req.body.userId, 1] } });
        res.status(200).json({ message: "Upvoted", comment });
      } else {
        await comment.updateOne({ $pull: { votes: [req.body.userId, 1] } });
        res.status(200).json({ message: "Unupvoted", comment });
      }
    } else {
      if (!comment.votes.includes([req.body.userId, -1])) {
        await comment.updateOne({ $pull: { votes: [req.body.userId, 1] } });
        await comment.updateOne({ $push: { votes: [req.body.userId, -1] } });
        res.status(200).json({ message: "Downvoted" });
      } else {
        await comment.updateOne({ $pull: { votes: [req.body.userId, -1] } });
        res.status(200).json({ message: "Undownvoted" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
