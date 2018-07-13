<template>
  <div id="main-app" class="content">
    <operation-main :model="operationModel" :options="userOptions"/>
    <account-main :model="accountModel" :http="http" :base-url="baseUrl"/>
    <budget-main :model="budgetModel" :http="http" :base-url="baseUrl"/>
    <!-- <goal-main :model="goalModel"/> -->
    <category-main :model="categoryModel"/>
    <!-- <user-main :model="userModel"/> -->
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
import http from './Api/pfetch';
import { createNew } from 'trutils';
import getBaseUrl from './api/baseUrl';
import options from '../config/userOptions.js';
export default {
  name:'main-app',
  components: { CategoryMain, OperationMain, GoalMain,BudgetMain, AccountMain, UserMain },
  data(){
    return {
      http,
      baseUrl: getBaseUrl(),
      userOptions: options
    };
  },
  created(){
    this.operationModel = createNew( socket, { baseUrl: this.baseUrl, url:'/operation' });
    this.goalModel = createNew( socket, { baseUrl: this.baseUrl, url:'/goal' });
    this.budgetModel = createNew( socket, { baseUrl: this.baseUrl, url:'/budget' });
    this.accountModel = createNew( socket, { baseUrl: this.baseUrl, url:'/account' });
    this.userModel = createNew( socket, { baseUrl: this.baseUrl, url:'/user' });
    this.categoryModel = createNew( socket, { baseUrl: this.baseUrl, url:'/category' });
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
<style src="./MainApp.scss"></style>
