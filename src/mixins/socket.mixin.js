export default function socketMixing( name ) {
  return {
    mounted() {
      if ( this.model.on ){
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
      }
    }
  };
}
