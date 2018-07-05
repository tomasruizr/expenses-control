<template>
  <div id="budget-main">
    <budget-edit :title="editTitle" :data="editBudget" @saved="editSaved"/>
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
      editBudget:{}
    };
  },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Budget' : 'Edit Budget';
    },
    budgets() {
      return this.$store.state.budgets;
    }
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.budget = modelInstance;
    },
    editSaved( data ){
      this.editBudget = {};
      let method = this.isNew ? 'post' : 'put';
      this.budget[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.$store.commit( 'addToStore', { property:'budgets', value:response.body });
        else
          this.$store.commit( 'updateId', { property:'budgets', value:response.body });
      });
      this.isNew = true;
    },
    listEdit( budget ){
      this.isNew = false;
      this.editBudget = budget;
    },
    listDelete( data ){
      this.budget.delete( data.id ).then(() => {
        this.$store.commit( 'deleteId', { property:'budgets', value:data });
      });
    },
  }
};
</script>
