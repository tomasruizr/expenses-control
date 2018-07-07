<template>
  <div id="account-main">
    <account-edit v-show="showEdit" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <button @click="showEdit=true" v-show="!showEdit">Add Account</button>
    <account-list :data="accounts" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import AccountList from './AccountList.vue';
import AccountEdit from './AccountEdit.vue';
import mainMixin from '../mixins/main.mixin.js';
import editMixin from '../mixins/edit.mixin.js';
import listMixin from '../mixins/list.mixin.js';
import socketMixin from '../mixins/socket.mixin.js';
export default {
  name:'account-main',
  mixins:[
    mainMixin,
    listMixin( 'account', false ),
    editMixin( 'account' ),
    socketMixin( 'account' )
  ],
  components: { AccountList, AccountEdit },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Account' : 'Edit Account';
    },
    accounts() {
      return this.$store.state.accounts;
    }
  }
};
</script>
<style lang="scss">
#account-main {
  margin-top: 50px;
}
</style>
