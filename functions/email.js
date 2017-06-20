const nodemailer = require('nodemailer');
const {MAILGUN, GMAIL_ACCNT, GMAIL_PASS, API} = require("./config.js");
const { renderEmail } = require('./render');

const mailgun = require('mailgun.js');
const mg = mailgun.client({username: 'api', key: MAILGUN.KEY});

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_ACCNT,
    pass: GMAIL_PASS
  }
});


module.exports.sendConfirmationEmail = (state) => {
  state.subscribe = true;

  return renderEmail(state).then( (html) => {

    let mailOptions = {
      from: "redditnewsletter <redditnewsletter@filipwolanski.com>",
      to: state.email,
      subject: `r/${state.subreddit.name}${state.frequency}newsletter Subscription Confirmation`,
      html: html,
      text: ""
    };
    return mg.messages.create(MAILGUN.DOMAIN, mailOptions);
  });
};

module.exports.sendNewsletter = (state) => {
  let key = Object.getOwnPropertySymbols(state)[0];
  let id = state[key].id;

  state.subscribe = false;
  state.removeURL = `${API}/remove?id=${id}`;

  return renderEmail(state).then( (html) => {

    let mailOptions = {
      from: "redditnewsletter <redditnewsletter@filipwolanski.com>",
      to: state.email,
      subject: `r/${state.subreddit.name}${state.frequency}newsletter`,
      html: html,
      text: ""
    };

    return mg.messages.create(MAILGUN.DOMAIN, mailOptions);

  });

};
