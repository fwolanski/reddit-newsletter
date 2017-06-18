const functions = require('firebase-functions');
const juice = require('juice');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");


const { addSubscription } = require('./datastore');

const serverRenderer = require('vue-server-renderer');
const serverBundle = require("./vue-ssr-server-bundle.json");

const renderer = serverRenderer.createBundleRenderer(serverBundle, {
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
});



// hpqeohyojatlbcle
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'wolanski@gmail.com',
    pass: 'hpqeohyojatlbcle'
  }
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {


  let state = req.body;
  addSubscription(state);
  return
  // let dbState = stateToDB(state);

  return new Promise((resolve, reject) => {
    renderer.renderToString({
      subreddit: "funny",
      postCount: 10,
      commentCount: 5,
      frequency: "weekly",
      time: {
        hour: 9,
        meridiem: "AM"
      },
      monthly: "1st",
      weekly: "Monday",
    }, function (err, html) {
      if (err) { reject(err); return; }
      let inlined = juice(html);
      resolve(inlined);
    })

  }).then(html => {

    let mailOptions = {
      from: "\"redditnewsletter\" <redditnewsletter@mydomain.com>",
      to: 'wolanski@gmail.com',
      subject: 'Hello',
      html: html
    };
     res.status(200).send(html);

    // console.log(mailOptions.to);
    // return transporter.sendMail(mailOptions)

  }).then(info => {

    // res.status(200).send("DONE");

  }).catch( error => {

    console.error(error);

  });

});

// exports.app = functions.https.onRequest(app);

const WEB_PORT = 5002;
app.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT}`)
});


