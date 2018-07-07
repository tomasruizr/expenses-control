<template>
<div id="operations-edit">
  <form @submit="submit">
    <h1>New Operations</h1>
    <input type="text" v-model="data.kind" placeholder="Kind">
    <input type="text" v-model="data.name" placeholder="Name">
    <input type="text" v-model="data.amount" placeholder="Amount">
    <input type="text" v-model="data.description" placeholder="Description">
    <select name="budget" id="budget" v-model="data.budget">
      <option v-for="(budget) in budgets" :key="budget.id" :value="budget.id">{{budget.name}}</option>
    </select>
    <select name="account" id="account" v-model="data.account">
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
  methods:{
    submit( event ){
      event.preventDefault();
      let data = Object.assign({}, this.data );
      data.account = data.account.id;
      data.budget = data.budget.id;
      this.$emit( 'saved', this.data );
    }
  }
};
</script>
