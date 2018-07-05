export default {
  mounted(){
    this.initAccount( this.accountModel );
  },
  methods: {
    initAccount( modelInstance ){
      this.account = modelInstance;// || this.isSocket ? socket : model );
      if ( this.account.on ){
        this.account.on( 'account', this.manageSocketEvent );
      }
      return this.account.get().then(( data ) => {
        this.$store.commit( 'addToStore', { property:'accounts', value: data.body });
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.$store.commit( 'addToStore', { property:'accounts', value:message.data });
      } 
      let index = this.accounts.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.$store.commit( 'deleteFromStore', { property:'accounts', index });
      else if ( message.verb === 'updated' )
        this.$store.commit( 'updateIndex', { property:'accounts', value:message.data, index });
    }
  }
};
