require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
// const mongoose = require("mongoose");
// module.exports = (req, res, next) => {
//   // console.log("Hello middleware");
//   const { authorization } = req.headers;
//   if (!authorization) {
//     res.status(401).json({ error: "You should Log in" });
//   }
//   // res.json("ok");
//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
//     if (err) {
//       res.status(401).json({ error: "You should Log in 2" });
//     }
//     const { _id } = payload;
//     User.findById(_id).then((userData) => {
//       req.user = userData;
//       next();
//       // console.log(userData);
//     });
//   });
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You should log in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { _id } = payload;

    User.findById(_id)
      .then((userData) => {
        if (!userData) {
          return res.status(401).json({ error: "User not found" });
        }

        // Attach the user data to the request object
        req.user = userData;

        // Continue with the next middleware or route handler
        next();
      })
      .catch((err) => {
        // Handle any errors that occur during database query
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};
