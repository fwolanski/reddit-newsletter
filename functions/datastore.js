const Datastore = require('@google-cloud/datastore');
let moment = require('moment');
moment = require('moment-timezone');

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

  // clone out object
  let dbState = JSON.parse(JSON.stringify(state));
  toGlobalTimezone(dbState);

  dbState.subscribed = false;

  delete dbState["subscribe"];
  delete dbState["previewable"];
  delete dbState["busy"];
  delete dbState["renderEmailOnly"];

  return dbState;

};

module.exports.addSubscription = (state) => {

  let dbState = stateToDB(state);
  const subKey = datastore.key('Subscription');
  const entity = {
    key: subKey,
    data: dbState
  };

  return datastore.save(entity)
    .then(() => {
      return new Promise((resolve, reject) => {
        resolve(subKey.id);
      })
    });
};

module.exports.confirmSubscription = (id) => {
  let entity;
  return datastore.get({
    kind: 'Subscription',
    id: id
  }).then( result => {
    if (result.length !== 1) {
      throw `Could not find entity with id: ${id}`
    }
    entity = result[0];
    entity.subscribed = true;
    return datastore.update(entity);
  }).then(() => {
    return new Promise((resolve, reject) => {
      resolve(entity)
    });
  });
};



module.exports.removeSubscription = (id) => {
  return datastore.delete({
    kind: 'Subscription',
    id: id
  })
};

const getCurrentUTC = () => {
  let now = moment().tz('UTC');
  if (now.minute() > 30) {
    now.add(30, 'minutes');
  }

  return {
    hour: now.hour(),
    date: now.date(),
    day: moment.weekdays(true)[now.day()]
  }
};

module.exports.findNewslettersDueNow = () => {

  let utc = getCurrentUTC();

  const dailyQuery = datastore.createQuery('Subscription')
    .filter('subscribed', '=', true)
    .filter('frequency', '=', 'daily')
    .filter('time', '=', utc.hour);

  const weeklyQuery = datastore.createQuery('Subscription')
    .filter('subscribed', '=', true)
    .filter('frequency', '=', 'weekly')
    .filter('time', '=', utc.hour)
    .filter('weekly', '=', utc.day);

  const monthlyQuery = datastore.createQuery('Subscription')
    .filter('subscribed', '=', true)
    .filter('frequency', '=', 'monthly')
    .filter('time', '=', utc.hour)
    .filter('monthly', '=', utc.date);

  return Promise.all([
    datastore.runQuery(dailyQuery),
    datastore.runQuery(weeklyQuery),
    datastore.runQuery(monthlyQuery)
  ]).then( values => {

    return new Promise((resolve, reject) => {
      let subscriptions = values.map((v) => {
        return v[0];
      });
      subscriptions = [].concat.apply([], subscriptions).filter(elem => {
        return elem
      });
      resolve(subscriptions)
    });

  });

};
