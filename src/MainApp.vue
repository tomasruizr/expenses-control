<template>
  <div id="mainApp">
    <user-add/>
    <user-list/>
  </div>
</template>

<script>
import UserList from './Users/UserList.vue'
import UserAdd from './Users/UserEdit.vue'
export default {
  name:'mainApp',
  components: { UserList, UserAdd }
}
</script>
<style lang="scss">
#mainApp {
  font-family: Sans-Serif;
}
</style>
