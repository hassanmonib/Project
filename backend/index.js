console.clear();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const cors = require("cors");
const app = express();
var session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost/semseterp")
  .then(() => {
    app.listen(5000, () => console.log("Mongodb connection is succesfull"));
  })
  .catch((err) => {
    console.log("Error in connecting MongoDB connection...");
    console.log(err);
  });
