<template>
  <div id="main-app">
    <user-main :model="model"/>
  </div>
</template>

<script>
import UserMain from './Users/UserMain.vue';
import socket from './Api/socket';
import { createNew } from 'trutils';
import env from '../config/env.js';
export default {
  name:'main-app',
  components: { UserMain },
  created(){
    this.model = createNew( socket, { url:'/user' });
  }
};
</script>
<style lang="scss">
#mainApp {
  font-family: Sans-Serif;
}
</style>
