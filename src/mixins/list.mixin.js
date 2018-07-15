/**
 * Convention over Configuration. Data array for the list will always be modelName+s
 * @param {string} name the name of the model
 * @param {bool} createData Whether to create the data object property
 */
export default function listMixing( name , manageData = true ) {
  let dataFunction = function(){
    let data = {};
    if ( manageData ){
      data[`${name}s`] = [];
    }
    return data;
  };
  return {
    data:dataFunction,
    mounted(){
      this.init();
    },
    methods:{
      init(){
        if ( manageData ){
          this.model.get().then(( data ) => {
            this[`${name}s`] = data.body;
          });
        }
      },
      listDelete( data, index ){
        this.model.delete( data.id ).then(() => {
          this[`${name}s`].splice( index,1 );
        }).catch( this.onError );
      }
    }
  };
}
