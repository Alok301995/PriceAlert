const route = require("express").Router();

const verifUser = (req, res, next) => {
  let token = null;
  const cookie = req.headers["cookie"];
  token = cookie.split("=")[1];
  if (!token) {
    return res.status(200).send("Not login");
  }
  next();
};

route.get("/", verifUser, (req, res, next) => {
  res.clearCookie("token");
  res.status(200).send({ logout: true, login: false });
});

module.exports = route;
