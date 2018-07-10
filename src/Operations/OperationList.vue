<template>
  <div id="operation-list">
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>Is Deposit</th>
        <!-- <th>Name</th> -->
        <th>Amount</th>
        <th>Description</th>
        <th>Budget</th>
        <th>Account</th>
        <th>Category</th>
      </thead>
      <tbody id="operations">
        <tr v-for="(operation, index) in data" :key= "operation.id">
          <td><a href="#" @click="edit(operation, index)" class="list-edit">Edit</a></td>
          <td><a href="#" @click="$emit( 'delete', operation, index )" class="list-delete">Delete</a></td>
          <td>{{operation.id}}</td>
          <td>{{operation.isDeposit}}</td>
          <!-- <td>{{operation.name}}</td> -->
          <td>{{operation.amount}}</td>
          <td>{{operation.description}}</td>
          <td>{{operation.budget ? $store.getters.getById( 'budgets', operation.budget ).name : "" }}</td>
          <td>{{operation.account ? $store.getters.getById( 'accounts', operation.account ).name : "" }}</td>
          <td>{{operation.category ? $store.getters.getById( 'categories', operation.category ).name : "" }}</td>
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
