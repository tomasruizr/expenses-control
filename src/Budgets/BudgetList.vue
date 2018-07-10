<template>
  <div id="budget-list">
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Is Percentage</th>
      </thead>
      <tbody id="budget">
        <tr v-for="(budget, index) in data" :key= "budget.id">
          <td><a href="#" @click="$emit('edit', budget, index)" class="list-edit">Edit</a></td>
          <td><a href="#" @click="remove(budget, index)" class="list-delete">Delete</a></td>
          <td>{{budget.id}}</td>
          <td>{{budget.name}}</td>
          <td>{{budget.amount}}</td>
          <td>{{budget.isPercentage}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'budget-list',
  props:{
    data: Array
  },
  methods:{
    edit( budget, index ){
      this.$emit( 'edit', budget, index );
    },
    remove( budget, index ){
      this.$emit( 'delete', budget, index );
    }
  }
};
</script>