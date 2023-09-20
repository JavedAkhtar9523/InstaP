const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/UserSchema");
const RequireLogin = require("../middlewares/RequireLogin");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/createPost", RequireLogin, (req, res) => {
  console.log("Hello create post router");
});

router.post("/signup", (req, res) => {
  // console.log(req.body.name);
  // res.send(req.body.name);

  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(422).json({ error: "All fields are mendatory" });
  }

  User.findOne({ $or: [{ email }, { username }] }).then((exitData) => {
    //User.findOne({ email: email })
    if (exitData) {
      return res.json({ error: "User Already Exist" });
    } else {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const data = new User({
          name,
          username,
          email,
          password: hashedPassword,
        });
        data
          .save()
          .then((user) => {
            res.json({ message: "Registered Successfully" });
            console.log("Successfully added");
          })
          .catch((err) => {
            res.json({ err: "failed" });
          });
      });
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "all fields are required" });
  }
  User.findOne({ email: email }).then((existData) => {
    if (!existData) {
      return res.status(422).json({ error: "Invalid Credensials" });
    }
    // console.log(existData);

    bcrypt
      .compare(password, existData.password)
      .then((isMatch) => {
        if (isMatch) {
          // return res.status(200).json({ message: "Login Successfully" });
          const token = jwt.sign({ _id: existData.id }, process.env.SECRET_KEY);
          const { _id, name, email, username } = existData;
          res.json({ token, user: { _id, name, email, username } });
          console.log({ token, user: { _id, name, email, username } });
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
