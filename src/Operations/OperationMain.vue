<template>
  <div id="operation-main">
    <operation-edit v-show="showEdit" :accounts='accounts' :budgets='budgets' :data="editOperation" @saved="editSaved" @cancel="showEdit=false"/>
    <button @click="showEdit=true" v-show="!showEdit">Add Operation</button>
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
      showEdit:false,
      operation: {},
      isNew:true,
      operations:[],
      editOperation:{}
    };
  },
  computed:{
    accounts(){
      return this.$store.state.accounts;
    },
    budgets(){
      return this.$store.state.budgets;
    },
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
      let sanitizedData = Object.assign({}, data );
      sanitizedData.account = sanitizedData.account.id;
      sanitizedData.budget = sanitizedData.budget.id;
      this.editOperation = {};
      let method = this.isNew ? 'post' : 'put';
      this.operation[method]( sanitizedData ).then(( response ) => {
        if ( method === 'post' )
          this.operations.push( response.body );
      });
      this.isNew = true;
      this.showEdit = false;
    },
    listEdit( operation ){
      this.isNew = false;
      this.showEdit = true;
      this.editOperation = operation;
    },
    listDelete( data, index ){
      this.operation.delete( data.id ).then(() => {
        this.operations.splice( index, 1 );
      });
    },
  }
};
</script>
<style lang="scss">
#operation-main {
  margin-top: 50px;
}
</style>
