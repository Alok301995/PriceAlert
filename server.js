const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const cookieParser = require("cookie-parser");
const server = express();
const path = require("path");

// Imports
const urlRoute = require("./Routes/urlRoute");
const userReg = require("./Routes/userReg");
const login = require("./Routes/userLogin");
const auth = require("./Routes/userAuth");
const userData = require("./Routes/userData");
const { cronJob, mailCronJob } = require("./controller/cronjob");
const profile = require("./Routes/profile");
const logout = require("./Routes/logout");
const notify = require("./Routes/notify");
const notifiactionCount = require("./Routes/notificationCount");
const resetPass = require("./Routes/resetPassword");
const contactInfo = require("./Routes/contact");

server.use(cookieParser());
server.use(express.json());
server.use(cors());

// Imported Route
server.use("/auth", auth);
server.use("/userReg", userReg);
server.use("/login", login);
server.use("/url", urlRoute);
server.use("/userdata", userData);
server.use("/profileData", profile);
server.use("/logout", logout);
server.use("/notification", notify);
server.use("/notificationCount", notifiactionCount);
server.use("/resetpassword", resetPass);
server.use("/contact", contactInfo);

// Error handler Middleware
server.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.send({
    status: err.status || 500,
    message: err.message,
    stack: err.stack,
  });
});

// Database
mongoose.connect(
  process.env.db,
  {
    useNewUrlParser: true,
    dbName: "User",
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("Error Occured");
      return;
    }
  }
);
mongoose.connection.once("open", () => {
  console.log("db Connected");
});
mongoose.connection.on("error", () => {
  console.log("Error in mongodb");
});

// Cron Job
cron.schedule("*/15 * * * *", async () => {
  console.time("slow code");
  console.log("cron running ");
  await cronJob();
  console.log("cron completed");
  console.timeEnd("slow code");
});

// For production

if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000 || 6000;
server.listen(port, () => {
  console.log(`Server Started at PORT -> ${port}`);
});
