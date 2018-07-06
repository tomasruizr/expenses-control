export default function listMixing( name , createData = true ) {
  return {
    data(){
      return {
        editData: {}
      };
    },
    methods:{
      onEdit( data ){
        this.isNew = false;
        debugger;
        this.editData = data;
      },
      editSaved( data ){
        this.editData = {};
        let method = this.isNew ? 'post' : 'put';
        this.model[method]( data ).then(( response ) => {
          if ( method === 'post' )
            this[`${name}s`].push( response.body );
        });
        this.isNew = true;
      }
    }
  };
}
