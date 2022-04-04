const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const PORT = 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongodb connected");
});

//ミドルウェア(jsonのみを解析)
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("hello mernstack");
});

app.get("/users", (req, res) => {
  res.send("user pages");
});

app.listen(PORT, () => console.log("server running"));
