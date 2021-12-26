const route = require("express").Router();
const scraper = require("../controller/scrapper");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

// URL verification Middleware

const verifyUrl = (req, res, next) => {
  const { url } = req.body;
  // const brand =['flipkart' ,'amazon' ,'nykaa' ,'snapdeal','myntra']
  if (!url) {
    res.send("");
    return;
  }
  if (
    url.includes("flipkart") ||
    url.includes("amazon") ||
    url.includes("nykaa") ||
    url.includes("snapdeal") ||
    url.includes("paytmmall") ||
    url.includes("limeroad") ||
    url.includes("reliancedigital")
  ) {
    next();
  } else {
    res.send({ msg: "invalid url", success: false });
    return;
  }
};

// scrapper

// End Point object {url:url}
route.post("/", verifyUrl, async (req, res, next) => {
  const { url } = req.body;
  try {
    const response = await scraper(url);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Endpoint for current price

route.post("/currentPrice", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await scraper(url);
    res.status(200).send(response[2]);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
