const route = require("express").Router();
const nodemailer = require("nodemailer");

route.post("/", async (req, res) => {
  const { email, text } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: "service.getalrt@gmail.com",
      pass: "8077199771",
    },
  });

  // check for null values
  if (email.length === 0 || text.length === 0) {
    res.status = 400;
    return res.send({ success: false, msg: "empty fields" });
  }
  transporter.sendMail(
    {
      from: "service.getalrt@gmail.com", // sender address
      to: "rsspyker@gmail.com",
      cc: "rahulprajapati000@gmail.com",
      bcc: "alokdhiman018@gmail.com", // list of receivers
      subject: "User Contact Alert", // Subject line
      text: `Hi, ${email}  is trying to contact you regarding ${text} , kindly reply as soon as possible}`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return res.send({ success: false, msg: "Unable to send Mail" });
      } else {
        return res.send({ success: true, msg: "Message sent succesfully" });
      }
    }
  );
});

module.exports = route;
