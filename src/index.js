// import './index.css';
import Vue from 'vue';
import store from './vuex';
import Main from './MainApp.vue';

const app = new Vue({
  store,
  el: '#app',
  render: h => h( Main )
});


export { app, store };