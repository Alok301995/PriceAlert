const route = require("express").Router();
const User = require("../Model/User");

route.post("/", async (req, res, next) => {
  const { email } = req.body;
  try {
    const document = await User.findOne({ email: email });
    if (document) {
      document["notificationCount"] = 0;
      await document.save();
      res.send({ notificationClear: true });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = route;
