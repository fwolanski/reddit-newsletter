import Vue from 'vue';
import Vuex from 'vuex';
import { getPosts, subscribe } from "./util";
import "babel-polyfill";

Vue.use(Vuex);

const createStore = (context) => {
  let defaults = {
    subreddit: {
      name: "",
      valid: true,
      downloading: false
    },
    postCount: 5,
    commentCount:  3,

    // schedule
    frequency: "weekly",

    time: {
      hour: 9,
      meridiem: "AM"
    },
    monthly: 1,
    weekly: "Monday",

    email: "",

    timezone: "",

    // state machine
    previewable: false,
    subscribe: false,
    busy: false,

    // downloadable data
    posts: []

  };


  let state = Object.assign({}, defaults, context);

  const store = new Vuex.Store({
    state: state,
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
          state.postCount = parseInt(value);
          if (store.getters.shouldGetPosts) {
            store.dispatch("updatePosts");
          }
        }
      },
      updateCommentCount (state, value) {
        if (state.commentCount !== value) {
          state.commentCount = parseInt(value);
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
      updateSubscribe (state, value) {
        state.subscribe = value;
      },
      updatePosts (state, value) {
        state.posts = value;
      },
      updateBusy(state, value) {
        state.busy = value
      },
      resetToAnother(state) {
        state.subreddit.name = "";
        state.previewable = false;
        state.subscribe = false;

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
          if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
            window.scrollTo(0, 0);
          }
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
        commit('updateBusy', true);
        return subscribe(state).then( () => {
          commit('updateSubscribe', true);
          commit('updateBusy', false);
        });
      }
    }
  });

  return store;
};


export default createStore;

