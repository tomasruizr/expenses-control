/**
 * Convention over Configuration. Data array for the list will always be modelName+s
 * @param {string} name the name of the model
 * @param {bool} createData Whether to create the data object property
 */
export default function listMixing( name , createData = true ) {
  let dataFunction = function(){
    let data = {};
    if ( createData ){
      data[`${name}s`] = [];
    }
    return data;
  };
  return {
    data:dataFunction,
    methods:{
      listDelete( data, index ){
        this.model.delete( data.id ).then(() => {
          this[`${name}s`].splice( index,1 );
        });
      }
    }
  };
}
