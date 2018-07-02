import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const state = {
  accounts: [],
  budgets: []
};

const store = new Vuex.Store({
  state,
  actions:{
    getAccounts({ commit }){

    }
  },
  mutations:{
    addToStore( prop, value ){
      if ( Array.isArray( value )){
        store[prop].concat( value );
      } else {
        store[prop].push( value );
      }
    },
    updateIndex( prop, index, value ){
      store[prop][index] = value;
    },
    deleteFromStore( prop, index ){
      store[prop].splice( index, 1 );
    }
  }
});

export default store;