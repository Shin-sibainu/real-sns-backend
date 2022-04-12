const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

const PORT = 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongodb connected");
});

//ミドルウェア(jsonのみを解析)
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

// app.get("/", (req, res) => {
//   res.send("hello mernstack");
// });

// app.get("/users", (req, res) => {
//   res.send("user pages");
// });

//画像アップロードシステム
// const storage = new GridFsStorage({
//   url: "mongodb:.//localhost:5000/a",
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];
//     if (match.indexOf(file.minetype) === -1) {
//       const filename = `${Date.now()}-a-${file.originalname}`;
//       return filename;
//     }
//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-a-${file.originalname}`,
//     };
//   },
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, gb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// //画像アップロードAPI
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("画像のアップロードに成功しました。");
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(PORT, () => console.log("server running"));
