const route = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.headers["authorization"]);
  if (!email || !password) {
    res.send({ msg: "Empty Field", success: false });
    return;
  }
  next();
};

// End Point Object {email:email , password:password}

route.post("/", verify, async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401).json({ msg: "Email Not Registered", success: false });
    return;
  }
  // If user exist than check the password of the user

  const hashCompare = await bcrypt.compare(password, user["password"]); // comapring password od the user // if matches it will return true else return false
  if (hashCompare) {
    try {
      const token = await jwt.sign({ email: email }, process.env.ACCESS_KEY);
      res.cookie("token", token, {
        maxAge: 9000000000,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ loggedIn: true, user: user["name"], success: true });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(200).send({ msg: "Invalid Password", success: false });
  }
});

module.exports = route;
