const Router = require("express");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");
const postRouter = Router();

postRouter.get("/", async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    return console.log(err);
  }
  if (!posts) {
    return res.status(500).send("Unexpected error");
  }
  return res.status(200).send({ posts });
});

postRouter.post("/", async (req, res) => {
  const { title, description, location, date, image, user } = req.body;
  if (!title && !description && !location && date && !image && !user) {
    return res.status(422).send("Invalid data");
  }

  let post;
  post = new Post({
    title,
    description,
    image,
    location,
    date: new Date(`${date}`),
    user,
  });

  try {
    await post.save();
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).send("Unexpected error");
  }
  return res.status(201).send({ post });
});

postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(404).send("No Post found");
  }
  return res.status(200).send({ post });
});

postRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, location, image } = req.body;
  if (!title && !description && !location && !image) {
    return res.status(422).send("Invalid data");
  }
  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,

      location,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).send("No Post found");
  }
  return res.status(200).send("Updated Succesfully");
});

postRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!post) {
    return res.status(500).send("No Post found");
  }
  return res.status(200).send("Deleted Succesfully");
});

module.exports = postRouter;
