<template>
  <div id="goal-list">
    <h1>Goals</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>Name</th>
        <th>Budget</th>
        <th>Amount</th>
        <th>Time To Complete</th>
        <th>Time Units</th>
      </thead>
      <tbody id="goals">
        <tr v-for="(goal, index) in data" :key= "goal.id">
          <td><a href="#" @click="$emit('edit', goal, index)" class="editGoal">Edit</a></td>
          <td><a href="#" @click="remove(goal, index)" class="deleteGoal">Delete</a></td>
          <td>{{goal.id}}</td>
          <td>{{goal.name}}</td>
          <td>{{goal.budget}}</td>
          <td>{{goal.amount}}</td>
          <td>{{goal.timeToComplete}}</td>
          <td>{{goal.timeUnits}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'goal-list',
  props:{
    data: Array
  },
  methods:{
    edit( goal, index ){
      this.$emit( 'edit', goal, index );
    },
    remove( goal, index ){
      this.$emit( 'delete', goal, index );
      this.data.splice( index, 1 );
    }
  }
};
</script>

<style lang="scss">
table th {
  padding: 5px
}
.editGoal {
  color: green;
}
.deleteGoal {
  color:lightsalmon;
}
</style>


