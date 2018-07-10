<template>
  <div id="operation-main">
    <h1>Operations</h1>
    <button class="button is-primary" @click="showEdit=true" v-show="!showEdit">Add Operation</button>
    <operation-edit 
      :defaultAccount="defaultAccount" 
      :defaultBudget="defaultBudget" 
      :defaultCategory="defaultCategory" 
      :budgets="budgets" 
      :accounts="accounts" 
      :categories="categories" 
      :title="editTitle" 
      :data="editData" 
      v-show="showEdit" 
      @saved="editSaved" 
      @cancel="showEdit=false"/>
    <operation-list :data="operations" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import OperationList from './OperationList.vue';
import OperationEdit from './OperationEdit.vue';
import mainMixin from '../mixins/main.mixin.js';
import editMixin from '../mixins/edit.mixin.js';
import listMixin from '../mixins/list.mixin.js';
import socketMixin from '../mixins/socket.mixin.js';
export default {
  name: 'operation-main',
  props: {
    defaultAccount: Number,
    defaultBudget: Number,
    defaultCategory: Number,
  },
  mixins:[
    mainMixin,
    listMixin( 'operation' ),
    editMixin( 'operation' ),
    socketMixin( 'operation' )
  ],
  components: { OperationList, OperationEdit },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Operation' : 'Edit Operation';
    },
    budgets() {
      return this.$store.state.budgets;
    },
    accounts() {
      return this.$store.state.accounts;
    },
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>
