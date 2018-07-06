export default function listMixing( name , createData = true ) {
  return {
    data(){
      // if ( createData ){
      //   let data = {};
      //   data[`${name}s`] = [];
      //   return data;
      // }
    },
    methods:{
      listDelete( data, index ){
        this.model.delete( data.id ).then(() => {
          this[`${name}s`].splice( index,1 );
        });
      }
    }
  };
}
