<template>
  <div id="main-app">
    <user-main/>
  </div>
</template>

<script>
import UserMain from './Users/UserMain.vue';
export default {
  name:'main-app',
  components: { UserMain },
};
</script>
<style lang="scss">
#mainApp {
  font-family: Sans-Serif;
}
</style>
