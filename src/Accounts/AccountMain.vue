<template>
  <div id="account-main">
    <h1>Accounts</h1>
    <button class="button is-primary" @click="showEdit=true" v-show="!showEdit">Add Account</button>
    <account-edit v-show="showEdit" :title="editTitle" :index="editIndex" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <a class="button is-link is-outlined" href="#" @click='showTransfer'>Make a transfer</a>
    <transfer-edit @saved="showEditTransfer=false" v-show="showEditTransfer" :base-url="baseUrl" :http="http" type="account"/>
    <account-list :data="accounts" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import TransferEdit from '../Transfers/TransferEdit.vue';
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
  props:{
    baseUrl: String,
    http: Function
  },
  components: { TransferEdit, AccountList, AccountEdit },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Account' : 'Edit Account';
    },
    accounts() {
      return this.$store.state.accounts;
    }
  },
  data() {
    return {
      showEditTransfer : false,
    };
  },
  methods:{
    showTransfer(){
      this.showEditTransfer = !this.showEditTransfer;
    },
  }
};
</script>
