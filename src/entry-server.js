import Vue from 'vue'
import Email from './newsletter/Email.vue'
import createStore from './Store.js'


export default (context) => {
  const store = createStore(context);

  return new Promise((resolve, reject) => {
    const app = new Vue({
      store,
      render: h => h(Email)
    });

    store.dispatch('updatePosts').then(() => {
      resolve(app);

    }).catch(reject);
  });

};

