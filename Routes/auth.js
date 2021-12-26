const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (token === undefined) {
    return res
      .status(200)
      .send({ msg: "Access Denied , Please Login ", auth: false });
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(200).send({ msg: "Access Denied , Please Login ", auth: false });
  }
};

module.exports = auth;
