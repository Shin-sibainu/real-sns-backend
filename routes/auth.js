const router = require("express").Router();
const User = require("../models/User");
// const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    //generate crypt password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //save user
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("user not found");

    // const vailedPassword = await bcrypt.compare(
    //   req.body.password,
    //   user.password,
    //   (err, res) => {
    //     console.log(res);
    //   }
    // );

    const vailedPassword = req.body.password === user.password;

    if (!vailedPassword) return res.status(400).json("password is not correct");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
