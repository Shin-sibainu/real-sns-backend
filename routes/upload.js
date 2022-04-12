const router = require("express").Router();
const Image = require("../models/Image");
const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// SET STRAGE(どこに保存するか。ファイルの名前はどうするか)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, file.filename + "-" + Date.now());
    // cb(null, file.originalname);
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
});

//画像アップロードAPI
router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("画像のアップロードに成功しました");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//画像アップロードAPI
// router.post("/", upload.single("file"), (req, res) => {
//   try {
//     console.log(req.file);
//     const img = fs.readFileSync(req.file.path);
//     const encode_img = img.toString("base64");
//     const final_img = {
//       contentType: req.file.mimetype,
//       image: new Buffer.from(encode_img, "base64"),
//     };
//     Image.create(final_img, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result.img.Buffer);
//         console.log("データベースに保存しました");
//         res.contentType(final_img.contentType);
//         res.send(final_img.image);
//         return res.status(200).json("画像のアップロードに成功しました。");
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });
