<template>
  <div id="operation-main">
    <operation-edit v-show="showEdit" :budgets="budgets" :accounts="accounts" :categories="categories" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <button @click="showEdit=true" v-show="!showEdit">Add Operation</button>
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
  name:'operation-main',
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
<style lang="scss">
#operation-main {
  margin-top: 50px;
}
</style>
