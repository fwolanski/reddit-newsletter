const Datastore = require('@google-cloud/datastore');
const moment = require('moment');
require('moment-timezone');

const datastore = Datastore();

const toGlobalTimezone = (state) => {

  let dateObj = {
    year: 2017,
    month: 3,
    date: parseInt(state.monthly),
    hour: state.time.hour + (state.time.meridiem === "PM" ? 12 : 0),
    minute: 0,
    seconds: 0
  };

  let time = moment().tz(state.timezone).set(dateObj);
  let utc = time.clone().tz('UTC');

  // get day of month and hour in utc
  state.monthly = utc.get('date');
  state.time = utc.get('hour');

  // get weekday in utc
  let day = moment().tz(state.timezone).day(state.weekly).hour(dateObj.hour);
  let utcday = day.clone().tz('UTC').day();
  state.weekly = moment.weekdays(true)[utcday];
};

const stateToDB = (state) => {

  // quickly clone out object
  let dbState = JSON.parse(JSON.stringify(state));
  toGlobalTimezone(dbState);

  dbState.subreddit = state.subreddit.name;
  dbState.subscribed = false;

  delete dbState["previewable"];

  return dbState;

};

module.exports.addSubscription = (state) => {

  let dbState = stateToDB(state);
  console.log(dbState);
  return;

  const subKey = datastore.key('Subscription');
  const entity = {
    key: subKey,
    data: dbState
  };

  return datastore.save(entity)
    .then(() => {
      console.log(`Subscription ${subKey.id} created successfully.`);
    });
};

module.exports.listSubscriptions = () => {
  const query = datastore.createQuery('Subscription')
    .order('created');

  datastore.runQuery(query)
    .then((results) => {
      const tasks = results[0];

      console.log('Tasks:');
      tasks.forEach((task) => {
        const taskKey = task[datastore.KEY];
        console.log(taskKey.id, task);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
};

