import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const state = {
  accounts: [],
  budgets: []
};

const store = new Vuex.Store({
  state,
  getters:{
    getAccountById: ( state ) => ( id ) => {
      return state.accounts.find( todo => todo.id === id );
    },
    getBudgetById: ( state ) => ( id ) => {
      return state.budgets.find( todo => todo.id === id );
    }
  },
  mutations:{
    replaceStore( state, payload ){
      state[payload.property] = Array.isArray( payload.value ) ? payload.value : [payload.value];
    },
    addToStore( state, payload ){
      if ( Array.isArray( payload.value )){
        state[payload.property] = state[payload.property].concat( payload.value );
      } else {
        state[payload.property].push( payload.value );
      }
    },
    updateId( state, payload ){
      let index = payload.index || state[payload.property].findIndex(( item ) => item.id === payload.value.id );
      state[payload.property][index] = payload.value;
    },
    deleteId( state, payload ){
      let index = payload.index || state[payload.property].findIndex(( item ) => item.id === payload.id );
      state[payload.property].splice( index, 1 );
    }
  }
});

export default store;