import Vue from 'vue'
import App from './App.vue'
import createStore from './Store.js'

import moment from 'moment';
require('moment-timezone');

let now = moment();

const getQueryStringValue =  (key) => {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
};

let storeData = {
  frequency: "weekly",
  time: {
    hour: now.hour() > 12 ? now.hour() - 12 :
      now.hour() === 0 ? 12 : now.hour(),
    meridiem: now.hour() > 12 ? "PM" : "AM"
  },
  monthly: now.date() > 28 ? 20 : now.date(),
  weekly: moment.weekdays()[now.day()],
  timezone: moment.tz.guess()
};


if (getQueryStringValue("confirm") === "true") {
  storeData.subscribe = true;
  storeData.confirm = true;
} else if (getQueryStringValue("remove") === "true") {
  storeData.subscribe = true;
  storeData.remove = true;
}

const store = createStore(storeData);

const app = new Vue({
  store,
  render: h => h(App)
});


const elemDiv = document.createElement('div');
elemDiv.id = "app";
document.body.appendChild(elemDiv);

app.$mount('#app');
