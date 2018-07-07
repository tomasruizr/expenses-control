<template>
  <div id="operation-list">
    <h1>Operations</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>Kind</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Budget</th>
        <th>Account</th>
        <th>Tags</th>
      </thead>
      <tbody id="operations">
        <tr v-for="(operation, index) in data" :key= "operation.id">
          <td><a href="#" @click="edit(operation, index)" class="editOperation">Edit</a></td>
          <td><a href="#" @click="$emit( 'delete', operation, index )" class="deleteOperation">Delete</a></td>
          <td>{{operation.id}}</td>
          <td>{{operation.Kind}}</td>
          <td>{{operation.name}}</td>
          <td>{{operation.amount}}</td>
          <td>{{operation.description}}</td>
          <td>{{operation.budget ? $store.getters.getBudgetById( operation.budget ).name : "" }}</td>
          <td>{{operation.account ? $store.getters.getAccountById( operation.account ).name : "" }}</td>
          <td>{{operation.tags}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'operation-list',
  props:{
    data: Array
  },
  methods:{
    edit( operation, index ){
      this.$emit( 'edit', operation, index );
    }
  }
};
</script>

<style lang="scss">
table th {
  padding: 5px
}
.editOperation {
  color: green;
}
.deleteOperation {
  color:lightsalmon;
}
</style>


