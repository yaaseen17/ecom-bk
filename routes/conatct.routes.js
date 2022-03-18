const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = function (app) {
  app.post("/contact", (req, res) => {
    let { name, email, message, subject } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "birdiey2017@gmail.com",
      subject: `${subject}`,
      text: `${name} has conatct you
          ${message}
          `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).send({ msg: "Email not sent" });
      } else {
        console.log("Email sent: " + info.response);
        res.send({ msg: "Email has been sent succefuly" });
      }
    });
  });
};
