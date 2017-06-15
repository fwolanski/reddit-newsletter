import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { getPosts } from "./util";
import "babel-polyfill";
require('moment-timezone');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {

    subreddit: {
      name: "",
      valid: true,
      downloading: false
    },
    postCount: 5,
    commentCount: 3,

    // schedule
    frequency: "weekly",
    time: {
      hour: 9,
      meridiem: "AM"
    },
    monthly: "1st",
    weekly: "Monday",
    timezone: moment.tz.guess(),

    // state machine
    previewable: false,

    posts: []

  },
  mutations: {
    updateSubreddit (state, value) {
      if (state.subreddit.name !== value) {
        state.subreddit.name = value;
        store.dispatch("updatePosts");
      }

    },
    updateSubredditObject (state, value) {
      state.subreddit = value;
      state.previewable = !value.downloading && value.valid;
    },
    updatePostCount (state, value) {
      if (state.postCount !== value) {
        state.postCount = value;
        if (store.getters.shouldGetPosts) {
          store.dispatch("updatePosts");
        }
      }
    },
    updateCommentCount (state, value) {
      if (state.commentCount !== value) {
        state.commentCount = value;
        if (store.getters.shouldGetPosts) {
          store.dispatch("updatePosts");
        }
      }
    },
    updateFrequency (state, value) {
      if (state.frequency !== value) {
        state.frequency = value;
        if (store.getters.shouldGetPosts) {
          store.dispatch("updatePosts");
        }
      }
    },
    updateTime (state, value) {
      state.time = value
    },
    updateMonthly (state, value) {
      state.monthly = value
    },
    updateWeekly (state, value) {
      state.weekly = value
    },
    updatePosts (state, value) {
      state.posts = value;
    }
  },
  getters: {
    shouldGetPosts: (state) => {
      return state.subreddit.valid && state.subreddit.name !== ""
    }
  },
  actions: {
    updatePosts ({commit, state}) {
      commit('updateSubredditObject', {
        name: state.subreddit.name,
        downloading: true,
        valid: true
      });

      getPosts(state, (posts) => {
        commit('updatePosts', posts);
        commit('updateSubredditObject', {
          name: state.subreddit.name,
          downloading: false,
          valid: true
        });

      }, (err) => {
        commit('updatePosts', []);
        commit('updateSubredditObject', {
          name: state.subreddit.name,
          downloading: false,
          valid: false
        });

      });
    }
  }
});

export default store;

