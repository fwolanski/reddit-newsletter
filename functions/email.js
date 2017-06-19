const nodemailer = require('nodemailer');
const settings = require("./config.json");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: settings.GMAIL_ACCNT,
    pass: settings.GMAIL_PASS
  }
});


module.exports.sendEmail = (to, from, subject, html) => {

  let mailOptions = {
    from: "\"redditnewsletter\" <redditnewsletter@mydomain.com>",
    to: to,
    subject: subject,
    html: html
  };

  return transporter.sendMail(mailOptions)

}
