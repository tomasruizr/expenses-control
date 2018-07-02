<template>
  <div id="operation-main">
    <operation-edit :data="editOperation" @saved="editSaved"/>
    <operation-list :data="operations" @edit="listEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import OperationList from './OperationList.vue';
import OperationEdit from './OperationEdit.vue';
export default {
  name:'operation-main',
  components: { OperationList, OperationEdit },
  props : {
    model: { type: Object }
  },
  data(){
    return {
      operation: {},
      isNew:true,
      operations:[],
      editOperation:{}
    };
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.operation = modelInstance;// || this.isSocket ? socket : model );
      if ( this.operation.on ){
        this.operation.on( 'operation', this.manageSocketEvent );
      }
      return this.operation.get().then(( data ) => {
        this.operations = data.body;
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.operations.push( message.data );
      } 
      let index = this.operations.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.operations.splice( index,1 );
      else if ( message.verb === 'updated' )
        this.operations.splice( index,1, message.data );
        // this.operations[index] = message.data;
    },

    editSaved( data ){
      this.editOperation = {};
      let method = this.isNew ? 'post' : 'put';
      this.operation[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.operations.push( response.body );
      });
      this.isNew = true;
    },
    listEdit( operation ){
      this.isNew = false;
      this.editOperation = operation;
    },
    listDelete( data ){
      this.operation.delete( data.id );
    },
  }
};
</script>
