const route = require("express").Router();
const auth = require("../Routes/auth");
const User = require("../Model/User");

// Under development

route.get("/", auth, async (req, res) => {
  const email = req.user.email;
  const document = await User.findOne({ email: email });
  res.send({
    name: document["name"],
    Data: document["Data"].reverse(),
    notificationCount: document["notificationCount"],
    id: document["_id"],
  });
});

module.exports = route;
