const jwt = require("jsonwebtoken");
const User = require("../Model/User");

// Cookie
const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (token === undefined) {
    res.status(200).send({ currentUser: "", email: "", login: false });
  } else {
    try {
      const user = jwt.verify(token, process.env.ACCESS_KEY);
      const doc = await User.findOne({ email: user.email });
      user.name = String(doc["name"]);
      res
        .status(200)
        .send({ currentUser: user["name"], email: user["email"], login: true });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = auth;
