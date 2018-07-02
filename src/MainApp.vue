<template>
  <div id="main-app">
    <operation-main :model="operationModel"/>
    <!-- <goal-main :model="goalModel"/> -->
    <budget-main :model="budgetModel"/>
    <account-main :model="accountModel"/>
    <user-main :model="userModel"/>
  </div>
</template>

<script>
import OperationMain from './Operations/OperationMain.vue';
import GoalMain from './Goals/GoalMain.vue';
import BudgetMain from './Budgets/BudgetMain.vue';
import UserMain from './Users/UserMain.vue';
import AccountMain from './Accounts/AccountMain.vue';
import socket from './Api/socket';
import { createNew } from 'trutils';
// import env from '../config/env.js';
export default {
  name:'main-app',
  components: { OperationMain, GoalMain,BudgetMain, AccountMain, UserMain },
  beforeCreate(){
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
