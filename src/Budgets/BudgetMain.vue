<template>
  <div id="budget-main">
    <h1>Budgets</h1>
    <button class="button is-primary" @click="showEdit=true" v-show="!showEdit">Add Budget</button>
    <budget-edit v-show="showEdit" :index="editIndex" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <a class="button is-link is-outlined" href="#" @click='showTransfer'>Make a transfer</a>
    <transfer-edit v-show="showEditTransfer" :base-url="baseUrl" :http="http" type="budget"/>
    <budget-list :data="budgets" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import TransferEdit from '../Transfers/TransferEdit.vue';
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
  components: { TransferEdit, BudgetList, BudgetEdit },
  props:{
    baseUrl: String,
    http: Function
  },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Budget' : 'Edit Budget';
    },
    budgets() {
      return this.$store.state.budgets;
    }
  },
  data() {
    return {
      showEditTransfer : false,
    };
  },
  methods:{
    showTransfer(){
      this.showEditTransfer = !this.showEditTransfer;
    },
  }
};
</script>
