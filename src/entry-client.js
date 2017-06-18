import Vue from 'vue'
import App from './App.vue'
import createStore from './Store.js'

import moment from 'moment';

let now = moment();


const store = createStore({
  subreddit: "",
  postCount: 5,
  commentCount: 3,
  frequency: "weekly",
  time: {
    hour: now.hour() > 12 ? now.hour() - 12 : now.hour(),
    meridiem: now.hour() > 12 ? "PM" : "AM"
  },
  monthly: now.date() > 28 ? 20 : now.date(),
  weekly: moment.weekdays()[now.day()],
});

const app = new Vue({
  store,
  render: h => h(App)
});


const elemDiv = document.createElement('div');
elemDiv.id = "app";
document.body.appendChild(elemDiv);

app.$mount('#app');
