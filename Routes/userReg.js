const route = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verification = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send({ msg: "Empty Fields", success: false });
    return;
  }
  next();
};
// End Point Object {name:name , email:email , password:password}

route.post("/", verification, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const doc = await User.findOne({ email: email });
    // if User exist
    if (!doc) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      });
      await newUser.save();
      res.status(201).send({ msg: "Registered Successfully ", success: true });
    } else if (doc) {
      // If User does not exists
      res.status(200).send({ msg: "Email Already Registered", success: false });
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = route;
