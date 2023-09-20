const express = require("express");
const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const POST = require("../models/Post");

const router = express.Router();

router.get("/allposts", RequireLogin, (req, res) => {
  POST.find()
    .populate("postedBy", "_id name")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.post("/createpost", RequireLogin, (req, res) => {
  const { body, pic } = req.body;
  if (!body || !pic) {
    return res.status(422).json({ error: "All fields are mendatory" });
  }
  req.data;
  // res.json("ok");

  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", RequireLogin, (req, res) => {
  // console.log(req.user);
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myposts) => {
      res.json(myposts);
    });
});
router.put("/like", RequireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id name Photo")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err.message });
    });
});

router.put("/unlike", RequireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("postedBy", "_id name Photo")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err.message });
    });
});

router.put("/comment", RequireLogin, (req, res) => {
  POST.findByIdAndUpdate(req.body.postId, {});
});
module.exports = router;
