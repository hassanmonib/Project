const Router = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).send("Unexpected error");
  }
  return res.status(200).send({ users });
});
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id).populate("posts");
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).send("No user Found");
  }
  return res.status(200).send({ user });
});

userRouter.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  let findUser = await User.findOne({ email });
  if (findUser) return res.status(400).send("Email already registered");
  const user = new User();
  user.name = name;
  user.email = email;
  let salt = await bcrypt.genSalt(10);
  hashPass = await bcrypt.hash(password, salt);
  user.password = hashPass;
  await user.save();
  return res.send(user);
});

// userRouter.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   let user;
//   if (!name || !email || !password || password.length < 6) {
//     return res.status(422).send("Invalid data");
//   }
//   try {
//     user = await User.create({ name, email, password });
//     let salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(user.password, salt);
//      user.password = hashPassword;
//     await user.save();
//   } catch (err) {
//     return console.log(err);
//   }

//   if (!user) {
//     return res.status(500).send("Unexpected error");
//   }
//   return res.status(200).send({ user });
// });

userRouter.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password && password.length < 6) {
    return res.status(422).send("Invalid data");
  }

  let exist;
  try {
    exist = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!exist) {
    return res.status(400).send("No user found");
  }

  const correctPssword = await bcrypt.compare(password, exist.password);
  if (!correctPssword) {
    return res.status(400).send("Incorrect Password");
  }
  return res.status(200).send({ id: exist._id, message: "Sucessful login" });
});

module.exports = userRouter;
