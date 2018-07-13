<template>
  <div id="operation-main">
    <h1>Operations</h1>
    <button class="button is-primary" @click="showEditComponent(false)" v-show="!showEdit">Add Expense</button>
    <button class="button is-info" @click="showEditComponent(true)" v-show="!showEdit">Add Income</button>
    <operation-edit 
      :index="editIndex"
      :options="options"
      :budgets="budgets"
      :accounts="accounts"
      :categories="categories"
      :title="editTitle"
      :data="editData"
      v-show="showEdit"
      @saved="editSaved"
      @cancel="cancel"/>
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
  components: { OperationList, OperationEdit },
  methods: {
    showEditComponent( isDeposit ){
      this.showEdit = true;
      this.isNew = true;
      this.showEdit = true;
      let data = {};
      data.isDeposit = isDeposit || false;
      data.date = new Date();
      this.editData = data;
    }
  },
  props: {
    options: Object
  },
  mixins:[
    mainMixin,
    listMixin( 'operation' ),
    editMixin( 'operation' ),
    socketMixin( 'operation' )
  ],
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
