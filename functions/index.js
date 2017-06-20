const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const {STATIC, API, WEB_PORT} = require("./config.js");


const { addSubscription, confirmSubscription, removeSubscription, findNewslettersDueNow } = require('./datastore');
const { sendConfirmationEmail, sendNewsletter } = require('./email');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {

  let state = req.body;

  addSubscription(state).then(key => {
    state.confirmURL = `${API}/confirm?id=${key}`;
    return sendConfirmationEmail(state)
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
  confirmSubscription(id).then( () => {
    res.redirect(`${STATIC}/?confirm=true`)
  }).catch( err => {
    res.status(500).send(err);
  });

});

app.get('/remove', (req, res) => {

  let id = req.query.id;
  if (typeof id !== 'string') {
    res.status(500).send("id not specified");
    return
  }
  removeSubscription(id).then( () => {
    res.redirect(`${STATIC}/?remove=true`)
  }).catch( err => {
    res.status(500).send(err);
  });

});


// app.get('/send', (req, res) => {
//
//   findNewslettersDueNow().then( (subscriptions) => {
//     let promises = subscriptions.map( (entity) => {
//       return sendNewsletter(entity)
//     });
//     return Promise.all(promises);
//   }).then(() => {
//     res.status(200).send("");
//   }).catch( err => {
//     res.status(500).send(err);
//   });
//
// });

exports.hourly_job = functions.pubsub.topic('hourly-tick').onPublish((event) => {

    findNewslettersDueNow().then( (subscriptions) => {
      let promises = subscriptions.map( (entity) => {
        return sendNewsletter(entity)
      });
      return Promise.all(promises);
    });
});

exports.app = functions.https.onRequest(app);

// app.listen(WEB_PORT, () => {
//   console.log(`Server running on port ${WEB_PORT}`)
// });


