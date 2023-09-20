const mongoose = require("mongoose");

const DB = process.env.DATA_BASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected Successfully");
  })
  .catch((err) => {
    console.log("Connnection Failed", err);
  });

// ------------------------------------
//SECOND METHOD
// mongoose.connect(DB);
// mongoose.connection.on("connected", () => {
//   console.log("DB connected Successfully");
// });
// mongoose.connection.on("error", () => {
//   console.log("Connection Failed");
// });
