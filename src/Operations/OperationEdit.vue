<template>
<div id="operations-edit" class="column is-5">
  <form @submit="submit">
    <h1>New Operations</h1>
    <label class="checkbox"><input type="checkbox" v-model="data.isDeposit" placeholder="Is Deposit">Is Deposit</label>
    <!-- <input class="input" type="text" v-model="data.name" placeholder="Name"> -->
    <input class="input" type="text" v-model="data.amount" placeholder="Amount">
    <input class="input" type="text" v-model="data.description" placeholder="Description">
    <div class="select">
      <select name="budget" id="budget" v-model="data.budget">
        <option v-for="(budget) in budgets" :key="budget.id" :value="budget.id">{{budget.name}}</option>
      </select>
    </div>
    <div class="select">
      <select name="account" id="account" v-model="data.account">
        <option v-for="(account) in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
      </select>
    </div>
    <div class="select">
      <select name="category" id="category" v-model="data.category">
        <option v-for="(category) in categories" :key="category.id" :value="category.id">{{category.name}}</option>
      </select>
    </div>
    <input class="button is-primary is-outlined" type="submit" :value="btnCaption">
    <a class="button is-link is-outlined" @click="$emit('cancel')" href="#">Cancel</a>
  </form>
</div>
</template>
<script>
export default {
  props:{
    defaultAccount:Number,
    defaultBudget:Number,
    defaultCategory:Number,
    data: Object,
    budgets: Array,
    accounts: Array,
    categories: Array,
    btnCaption: {
      type: String,
      default: 'Save'
    }
  },
  mounted(){
    if ( !this.data || ( this.data && !this.data.id )){
      this.data = this.data || {};
      this.data.account = this.defaultAccount;
      this.data.budget = this.defaultBudget;
      this.data.category = this.defaultCategory;
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
