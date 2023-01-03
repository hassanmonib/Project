const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
