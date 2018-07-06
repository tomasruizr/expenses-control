<template>
  <div id="main-app">
    <!-- <operation-main :model="operationModel"/> -->
    <account-main :model="accountModel"/>
    <!-- <budget-main :model="budgetModel"/> -->
    <!-- <goal-main :model="goalModel"/> -->
    <!-- <user-main :model="userModel"/> -->
  </div>
</template>

<script>
import OperationMain from './Operations/OperationMain.vue';
import GoalMain from './Goals/GoalMain.vue';
import BudgetMain from './Budgets/BudgetMain.vue';
import UserMain from './Users/UserMain.vue';
import AccountMain from './Accounts/AccountMain.vue';
import AccountLoader from './Accounts/AccountLoader.js';
import BudgetLoader from './Budgets/BudgetLoader.js';
import socket from './Api/socket';
import { createNew } from 'trutils';
// import env from '../config/env.js';
export default {
  name:'main-app',
  mixins : [ AccountLoader, BudgetLoader ],
  components: { OperationMain, GoalMain,BudgetMain, AccountMain, UserMain },
  created(){
    this.operationModel = createNew( socket, { url:'/operation' });
    this.goalModel = createNew( socket, { url:'/goal' });
    this.budgetModel = createNew( socket, { url:'/budget' });
    this.accountModel = createNew( socket, { url:'/account' });
    this.userModel = createNew( socket, { url:'/user' });
  }
};
</script>
<style lang="scss">
#mainApp {
  font-family: Sans-Serif;
}
</style>
