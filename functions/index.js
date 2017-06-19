const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const settings = require("./config.json");


const { addSubscription, confirmSubscription } = require('./datastore');
const { renderEmail } = require('./render');
const { sendEmail } = require('./email');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {

  let state = req.body;
  state.subscribe = true;

  addSubscription(state).then(key => {
    state.confirmURL = `${settings.API}/confirm?id=${key}`;
    return renderEmail(state)
  }).then(html => {
    return sendEmail(state.email, "", `r/${state.subreddit.name} Newsletter Subscription Confirmation`, html);

  }).then(() => {
    res.status(200).send({ status: "success" });

  }).catch( err => {
    res.status(500).send(err);
  });

});

app.get('/confirm', (req, res) => {

  let id = req.query.id;
  if (typeof id !== 'string') {
    res.status(500).send("id not specified");
    return
  }
  confirmSubscription(id).then( (state) => {
    state.subscribe = true;
    state.confirm = true;
    res.redirect(`${settings.STATIC}/?confirm=true`)
  }).catch( err => {
    res.status(500).send(err);
  });


});

// exports.app = functions.https.onRequest(app);

app.listen(settings.WEB_PORT, () => {
  console.log(`Server running on port ${settings.WEB_PORT}`)
});


