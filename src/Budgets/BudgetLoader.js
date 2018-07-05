export default {
  mounted(){
    this.initBudget( this.budgetModel );
  },
  methods: {
    initBudget( modelInstance ){
      this.budget = modelInstance;// || this.isSocket ? socket : model );
      if ( this.budget.on ){
        this.budget.on( 'budget', this.manageSocketEvent );
      }
      return this.budget.get().then(( data ) => {
        this.$store.commit( 'addToStore', { property:'budgets', value: data.body });
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.$store.commit( 'addToStore', { property:'budgets', value:message.data });
      } 
      let index = this.budgets.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.$store.commit( 'deleteFromStore', { property:'budgets', index });
      else if ( message.verb === 'updated' )
        this.$store.commit( 'updateIndex', { property:'budgets', value:message.data, index });
    }
  }
};
