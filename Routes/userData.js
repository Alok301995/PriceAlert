const route = require("express").Router();
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const auth = require("../Routes/auth");
const { update } = require("../Model/User");

// function to find the index of object in Data array
function indexOfObject(dataObj, url) {
  const len = Array.from(dataObj).length;
  for (let i = 0; i < len; i++) {
    if (String(dataObj[i]["url"]) === String(url)) {
      return i;
    }
  }
  return -1;
}

// update Route {updatedvalue , update index };
route.post("/updatePrice", auth, async (req, res) => {
  const email = req.user.email;
  const { updatePrice, updateIndex } = req.body;
  if (!updatePrice) {
    return res.send({ msg: "User Price is Empty", updateStatus: false });
  }

  try {
    const doc = await User.findOne({ email: email });
    if (!doc) res.send({ msg: "User not Login", updateStatus: false });
    else {
      doc["Data"][updateIndex]["target_price"] = Number(updatePrice);
      doc["Data"][updateIndex]["pricedrop"] = false;
      doc["Data"][updateIndex]["notified"] = false;
      await doc.save();
      res.send({
        msg: "Price added successfully, visit your profile for more insights.",
        updateStatus: true,
      });
    }
  } catch (error) {
    next(error);
  }
});

// end point Object {price:price , url:url}
route.post("/", auth, async (req, res, next) => {
  const email = req.user.email;
  const { data, price, url, current_price } = req.body;
  // console.log(data);

  // validation
  if (!price) {
    res.json({ msg: "Empty feild", success: false });
    return;
  }
  if (!data[1] || data[1] === "") {
    return res.send("Empty Product ");
  }

  // new user data
  const userData = {
    vendor: data[0],
    title: data[1],
    url: url,
    target_price: price,
    current_price: [Number(data[2])],
    dateArray: [new Date(Date.now()).toDateString()],
    pricedrop: false,
    notified: false,
    error: 0,
  };
  try {
    const doc = await User.findOne({ email: email });
    // if Data Array DNE
    if (Array.from(doc["Data"]).length === 0) {
      doc["Data"].push(userData);
      await doc.save();
      return res.json({
        msg: "Price added successfully, visit your profile for more insights.",
        success: true,
        updateIndex: -1,
        updateRequired: false,
      });
    } else {
      const objIndex = indexOfObject(doc["Data"], url);
      if (objIndex >= 0) {
        if (!doc["Data"][objIndex]["current_price"]) {
          doc["Data"][objIndex]["current_price"].push(Number(data[2]));
          doc["Data"][objIndex]["dateArray"].push(
            new Date(Date.now()).toDateString()
          );
          await doc.save();
          return res.json({
            msg: "Price added successfully, visit your profile for more insights.",
            success: true,
            updateIndex: -1,
            updateRequired: false,
          });
        } else {
          // update the price

          res.send({
            msg: "Price Already exist",
            success: false,
            updateIndex: objIndex,
            updateRequired: true,
          });
        }
      } else {
        doc["Data"].push(userData);
        await doc.save();
        return res.json({
          msg: "Price added successfully, visit your profile for more insights.",
          success: true,
          updateIndex: -1,
          updateRequired: false,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = route;
