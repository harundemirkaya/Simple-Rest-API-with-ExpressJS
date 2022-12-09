const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:postID", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);
    res.status(200).json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postID", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postID });
    res.status(200).send("Success!");
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postID", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postID },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
