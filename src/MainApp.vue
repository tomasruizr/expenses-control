<template>
  <div id="main-app">
    <category-main :model="categoryModel"/>
    <operation-main :model="operationModel"/>
    <account-main :model="accountModel"/>
    <budget-main :model="budgetModel"/>
    <!-- <goal-main :model="goalModel"/> -->
    <user-main :model="userModel"/>
  </div>
</template>

<script>
import vuexLoader from './vuex/vuexLoader';
import OperationMain from './Operations/OperationMain.vue';
import GoalMain from './Goals/GoalMain.vue';
import BudgetMain from './Budgets/BudgetMain.vue';
import UserMain from './Users/UserMain.vue';
import AccountMain from './Accounts/AccountMain.vue';
import CategoryMain from './Categories/CategoryMain.vue';
import socket from './Api/socket';
import { createNew } from 'trutils';
// import env from '../config/env.js';
export default {
  name:'main-app',
  components: { CategoryMain, OperationMain, GoalMain,BudgetMain, AccountMain, UserMain },
  beforeCreate(){
    this.operationModel = createNew( socket, { url:'/operation' });
    this.goalModel = createNew( socket, { url:'/goal' });
    this.budgetModel = createNew( socket, { url:'/budget' });
    this.accountModel = createNew( socket, { url:'/account' });
    this.userModel = createNew( socket, { url:'/user' });
    this.categoryModel = createNew( socket, { url:'/category' });
    vuexLoader(
      this.$store,
      [
        {
          model: this.accountModel,
          vuexProperty: 'accounts'
        },
        {
          model:this.budgetModel,
          vuexProperty: 'budgets'
        },
        {
          model:this.categoryModel,
          vuexProperty: 'categories'
        }
      ]);
  }
};
</script>
<style lang="scss">
#mainApp {
  font-family: Sans-Serif;
}
</style>
