<template>
<div id="operations-edit" class="column is-5">
  <form @submit="submit">
    <h1>New Operations</h1>
    <vue-datepicker-local v-model="data.date" :local="local" />
    <label class="checkbox"><input type="checkbox" v-model="data.isDeposit" placeholder="Is Deposit">Is Income</label>
    <!-- <input class="input" type="text" v-model="data.name" placeholder="Name"> -->
    <input class="input" type="text" v-model="data.amount" placeholder="Amount">
    <input class="input" type="text" v-model="data.description" placeholder="Description">
    Account
    <div class="select">
      <select name="account" id="account" v-model="data.account">
        <option v-for="(account) in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
      </select>
    </div>
    Budget
    <div class="select">
      <select name="budget" id="budget" v-model="data.budget">
        <option v-for="(budget) in budgets" :key="budget.id" :value="budget.id">{{budget.name}}</option>
      </select>
    </div>
    Category
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
import VueDatepickerLocal from 'vue-datepicker-local';
export default {
  components:{
    VueDatepickerLocal
  },
  data(){
    return {
      local: {
        dow: 0, // Sunday is the first day of the week
        hourTip: 'Select Hour', // tip of select hour
        minuteTip: 'Select Minute', // tip of select minute
        secondTip: 'Select Second', // tip of select second
        yearSuffix: '', // suffix of head year
        monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split( '_' ), // months of head
        months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split( '_' ), // months of panel
        weeks: 'Su_Mo_Tu_We_Th_Fr_Sa'.split( '_' ), // weeks,
        cancelTip: 'cancel',
        submitTip: 'confirm'
      }
    };
  },
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
      this.data.date = new Date();
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
      this.$emit( 'saved', this.data );
    }
  }
};
</script>
