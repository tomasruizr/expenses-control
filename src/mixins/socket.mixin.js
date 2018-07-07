export default function socketMixing( name, vuexProp ) {
  return {
    mounted() {
      if ( this.model.on ){
        if ( vuexProp )
          this.model.on( name, this.manageSocketEventVuex );
        else
          this.model.on( name, this.manageSocketEvent );
      }
    },
    methods:{
      manageSocketEvent( message ) {
        if ( message.verb === 'created' ){
          return this[`${name}s`].push( message.data );
        }
        let index = this[`${name}s`].findIndex(( item ) => item.id === message.id );
        if ( message.verb === 'destroyed' )
          this[`${name}s`].splice( index,1 );
        else if ( message.verb === 'updated' )
          this[`${name}s`].splice( index,1, message.data );
      },
      manageSocketEventVuex( message ){
        if ( message.verb === 'created' ){
          return this.$store.commit( 'addToStore', { property:vuexProp, value : message.data });
        } 
        if ( message.verb === 'destroyed' )
          this.$store.commit( 'deleteId', { property:vuexProp, value : message.id });
        else if ( message.verb === 'updated' )
          this.$store.commit( 'updateId', { property:vuexProp, value : message.data });
        
        this.init();
      }
    },
  };
}
