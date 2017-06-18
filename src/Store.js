import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { getPosts, subscribe } from "./util";
import "babel-polyfill";
require('moment-timezone');

Vue.use(Vuex);

const createStore = (context) => {

  const store = new Vuex.Store({
    state: {

      subreddit: {
        name: context.subreddit,
        valid: true,
        downloading: false
      },
      postCount: context.postCount,
      commentCount: context.commentCount,

      // schedule
      frequency: context.frequency,
      time: context.time,
      monthly: context.monthly,
      weekly: context.weekly,

      email: "",

      timezone: moment.tz.guess(),

      // state machine
      previewable: false,
      subscribed: false,
      busy: false,

      // downloadable data
      posts: []

    },
    mutations: {
      updateSubreddit (state, value) {
        if (state.subreddit.name !== value) {
          state.subreddit.name = value;
          store.dispatch("updatePosts");
        }

      },
      updateSubredditSync (state, value) {
        state.subreddit.name = value;
      },
      updateSubredditObject (state, value) {
        state.subreddit = value;
        state.previewable = !value.downloading && value.valid;
        state.busy = value.downloading;
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
      updateEmail (state, value) {
        state.email = value;
      },
      updateSubscribed (state, value) {
        state.subscribed = value;
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
        return new Promise ( (resolve, reject) => {
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
            resolve()

          }, (err) => {
            commit('updatePosts', []);
            commit('updateSubredditObject', {
              name: state.subreddit.name,
              downloading: false,
              valid: false
            });
            reject()
          });
        });
      },

      subscribe({commit, state}, email) {
        commit('updateEmail', email);
        console.log("subscribing to " + email);
        return subscribe(state).then( () => {
          commit('updateSubscribed', true);
        });
      }
    }
  });

  return store;
};


export default createStore;

