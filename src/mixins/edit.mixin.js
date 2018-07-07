/**
 * Convention over Configuration. Data Object for edition will always be editData
 * @param {string} name the name of the model
 * @param {bool} createData Whether to create the data object property
 */
export default function listMixing( name , createData = true ) {
  let dataFunction = function(){
    let data = {};
    if ( createData ){
      data.editData = {};
    }
    return data;
  };
  return {
    data:dataFunction,
    methods:{
      onEdit( data ){
        this.isNew = false;
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
