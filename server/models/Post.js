const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // default: "no photo",
    required: true,
  },
  likes: [{ type: ObjectId, ref: "user" }],
  comments: [
    {
      comment: { type: String },
      postedBy: { type: ObjectId, ref: "user" },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
});

const createModel = mongoose.model("post", PostSchema);
module.exports = createModel;
