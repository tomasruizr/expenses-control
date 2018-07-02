<template>
  <div id="budget-main">
    <budget-edit :data="editBudget" @saved="editSaved"/>
    <budget-list :data="budgets" @edit="listEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import BudgetList from './BudgetList.vue';
import BudgetEdit from './BudgetEdit.vue';
export default {
  name:'budget-main',
  components: { BudgetList, BudgetEdit },
  props : {
    model: { type: Object }
  },
  data(){
    return {
      budget: {},
      isNew:true,
      budgets:[],
      editBudget:{}
    };
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.budget = modelInstance;// || this.isSocket ? socket : model );
      if ( this.budget.on ){
        this.budget.on( 'budget', this.manageSocketEvent );
      }
      return this.budget.get().then(( data ) => {
        this.budgets = data.body;
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.budgets.push( message.data );
      } 
      let index = this.budgets.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.budgets.splice( index,1 );
      else if ( message.verb === 'updated' )
        this.budgets.splice( index,1, message.data );
        // this.budgets[index] = message.data;
    },

    editSaved( data ){
      this.editBudget = {};
      let method = this.isNew ? 'post' : 'put';
      this.budget[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.budgets.push( response.body );
      });
      this.isNew = true;
    },
    listEdit( budget ){
      this.isNew = false;
      this.editBudget = budget;
    },
    listDelete( data ){
      this.budget.delete( data.id );
    },
  }
};
</script>
