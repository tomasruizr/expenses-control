<template>
<div id="operations-edit">
  <form @submit="submit">
    <h1>New Operations</h1>
    <input type="text" v-model="data.kind" placeholder="Kind">
    <input type="text" v-model="data.name" placeholder="Name">
    <input type="text" v-model="data.amount" placeholder="Amount">
    <input type="text" v-model="data.description" placeholder="Description">
    <select name="budget" id="budget" v-model="budget">
      <option v-for="(budget, index) in budgets" :key="budget.id" :value="budget.id">{{budget.name}}</option>
    </select>
    <select name="account" id="account" v-model="account">
      <option v-for="(account) in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
    </select>
    <input type="text" v-model="data.tags" placeholder="Tags">
    <input type="submit" :value="btnCaption">
    <a @click="$emit('cancel')" href="#">Cancel</a>
  </form>
</div>
</template>
<script>
export default {
  props:{
    data: Object,
    budgets: Array,
    accounts: Array,
    btnCaption: {
      type: String,
      default: 'Save'
    }
  },
  computed: {
    budget:{ 
      get(){
        if ( this.data.budget && this.data.budget.id )
          return this.data.budget.id;
        else
          return this.data;
      },
      set( value ){
        this.data.budget = this.$store.getters.getBudgetById( value );
      }
    },
    account:{ 
      get(){
        if ( this.data.account && this.data.account.id )
          return this.data.account.id;
        else
          return this.data;
      },
      set( value ){
        this.data.account = this.$store.getters.getAccountById( value );
      }
    }
  },
  methods:{
    submit( event ){
      event.preventDefault();
      this.$emit( 'saved', this.data );
    }
  }
};
</script>
