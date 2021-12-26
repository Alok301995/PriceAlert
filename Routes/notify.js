const route = require("express").Router();
const auth = require("./auth");
const User = require("../Model/User");

route.get("/", auth, async (req, res) => {
  const email = req.user.email;

  try {
    const doc = await await User.findOne({ email: email });
    if (!doc) return res.send("user not found");
    const Data = doc["Data"];

    // logic for notification checking
    // create a notification arrray
    let notificationArray = [];
    for (let i = 0; i < Data.length; i++) {
      if (Boolean(Data[i]["pricedrop"] === true)) {
        notificationArray.push(Data[i]);
      }
    }

    res.status(200).json(notificationArray.reverse());
  } catch (error) {
    next(error);
  }
  const doc = User.findOne({ email: email });
  if (!doc) return res.send("User not found");
});

module.exports = route;
