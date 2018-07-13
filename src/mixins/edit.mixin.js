/**
 * Convention over Configuration. Data Object for edition will always be editData
 * @param {string} name the name of the model
 * @param {bool} createData Whether to create the data object property
 */
export default function editMixin( name , createData = true ) {
  let dataFunction = function(){
    let data = {};
    if ( createData ){
      data.editData = {};
    }
    data.editIndex = undefined;
    return data;
  };
  return {
    data:dataFunction,
    methods:{
      onEdit( data, index ){
        this.isNew = false;
        this.showEdit = true;
        this.editIndex = index;
        this.editData = Object.assign({},data );
      },
      editSaved( data, index ){
        this.editData = {};
        let method = this.isNew ? 'post' : 'patch';
        this.model[method]( data ).then(( response ) => {
          if ( method === 'post' ){
            this[`${name}s`].push( response.body );
          } else {
            this.$set( this[`${name}s`], index, response.body );
          }
        }).catch(( this.onError ));
        this.isNew = true;
        this.showEdit = false;
      },
      cancel(){
        this.editData = {};
        this.showEdit = false;
      },
    }
  };
}
