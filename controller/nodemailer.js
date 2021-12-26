const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: "service.getalrt@gmail.com",
    pass: "8077199771",
  },
});

async function sendMailAlert(email, title, name) {
  try {
    await transporter.sendMail({
      from: "service.getalrt@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Price Drop Alert!", // Subject line
      text: `Hello ${name} ,Your product ${title} is now available below your marked price.Check your notification in your profile to know more. Thank you, Get Alrt`,
    });
    console.log("Alert sent Successfully to --> ", email);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { sendMailAlert };
