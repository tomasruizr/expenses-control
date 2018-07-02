export default {
  props : {
    model: { type: Object }
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
    }
  }
};
</script>
