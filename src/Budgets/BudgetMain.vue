<template>
  <div id="budget-main">
    <budget-edit v-show="showEdit" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <button @click="showEdit=true" v-show="!showEdit">Add Budget</button>
    <budget-list :data="budgets" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import BudgetList from './BudgetList.vue';
import BudgetEdit from './BudgetEdit.vue';
import mainMixin from '../mixins/main.mixin.js';
import editMixin from '../mixins/edit.mixin.js';
import listMixin from '../mixins/list.mixin.js';
import socketMixin from '../mixins/socket.mixin.js';
export default {
  name:'budget-main',
  mixins:[
    mainMixin,
    listMixin( 'budget', false ),
    editMixin( 'budget' ),
    socketMixin( 'budget', 'budgets' )
  ],
  components: { BudgetList, BudgetEdit },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Budget' : 'Edit Budget';
    },
    budgets() {
      return this.$store.state.budgets;
    }
  }
};
</script>
<style lang="scss">
#budget-main {
  margin-top: 50px;
}
</style>
