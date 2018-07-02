<template>
  <div id="account-main">
    <account-edit :title="editTitle" :data="editAccount" @saved="editSaved"/>
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
      account: {},
      isNew:true,
      accounts:[],
      editAccount:{}
    };
  },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Account' : 'Edit Account';
    },
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.account = modelInstance;// || this.isSocket ? socket : model );
      if ( this.account.on ){
        this.account.on( 'account', this.manageSocketEvent );
      }
      return this.account.get().then(( data ) => {
        this.accounts = data.body;
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.accounts.push( message.data );
      } 
      let index = this.accounts.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.accounts.splice( index,1 );
      else if ( message.verb === 'updated' )
        this.accounts.splice( index,1, message.data );
        // this.accounts[index] = message.data;
    },

    editSaved( data ){
      this.editAccount = {};
      let method = this.isNew ? 'post' : 'put';
      this.account[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.accounts.push( response.body );
      });
      this.isNew = true;
    },
    listEdit( account ){
      this.isNew = false;
      this.editAccount = account;
    },
    listDelete( data ){
      this.account.delete( data.id );
    },
  }
};
</script>
