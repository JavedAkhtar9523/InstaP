require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//module
const User = require("./models/UserSchema");
const Post = require("./models/Post");
const AuthRoute = require("./routes/AuthRoute");
const createRoute = require("./routes/CreatesPost");

require("./db/conn");

const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/create", createRoute);

// app.get("/", (req, res) => {
//   res.json("running");
// });

app.listen(PORT, () => {
  console.log(`server is up at port no. ${PORT}`);
});
