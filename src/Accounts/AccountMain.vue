<template>
  <div id="account-main">
    <account-edit v-show="showEdit" :title="editTitle" :data="editAccount" @saved="editSaved" @cancel="showEdit=false"/> 
    <button @click="showEdit=true" v-show="!showEdit">Add Account</button>
    <account-list :data="accounts" @edit="listEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import AccountList from './AccountList.vue';
import AccountEdit from './AccountEdit.vue';
export default {
  name:'account-main',
  components: { AccountList, AccountEdit },
  props : {
    model: { type: Object }
  },
  data(){
    return {
      showEdit:false,
      account: {},
      isNew:true,
      editAccount:{}
    };
  },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Account' : 'Edit Account';
    },
    accounts() {
      return this.$store.state.accounts;
    }
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.account = modelInstance;
    },
    editSaved( data ){
      this.editAccount = {};
      let method = this.isNew ? 'post' : 'put';
      this.account[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.$store.commit( 'addToStore', { property:'accounts', value:response.body });
        else
          this.$store.commit( 'replaceStore', { property:'accounts', value:this.accounts });
      });
      this.isNew = true;
      this.showEdit = false;
    },
    listEdit( account ){
      this.isNew = false;
      this.editAccount = account;
      this.showEdit = true;
    },
    listDelete( data ){
      this.account.delete( data.id ).then(() => {
        this.$store.commit( 'deleteId', { property:'accounts', value:data });
      });
    },
  }
};
</script>
<style lang="scss">
#account-main {
  margin-top: 50px;
}
</style>
