<template>
  <div id="account-main">
    <h1>Accounts</h1>
    <button class="button is-primary" @click="showEdit=true" v-show="!showEdit">Add Account</button>
    <account-edit v-show="showEdit" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
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
    socketMixin( 'account', 'accounts' )
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
