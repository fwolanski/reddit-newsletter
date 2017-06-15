import "./style/index.sass";

import Vue from 'vue';
import App from './App.vue';
import store from './Store';

var elemDiv = document.createElement('div');
elemDiv.id = "app";
document.body.appendChild(elemDiv);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});


