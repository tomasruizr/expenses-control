<template>
  <div id="account-list">
    <h1>Accounts</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>Name</th>
        <th>Balance</th>
      </thead>
      <tbody id="users">
        <tr v-for="(account, index) in data" :key= "account.id">
          <td><a href="#" @click="$emit('edit', account, index)" class="editUser">Edit</a></td>
          <td><a href="#" @click="remove(account, index)" class="deleteUser">Delete</a></td>
          <td>{{account.id}}</td>
          <td>{{account.name}}</td>
          <td>{{account.balance}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'account-list',
  props:{
    data: Array
  },
  methods:{
    edit( account, index ){
      this.$emit( 'edit', account, index );
    },
    remove( account, index ){
      this.$emit( 'delete', account, index );
    }
  }
};
</script>

<style lang="scss">
table th {
  padding: 5px
}
.editUser {
  color: green;
}
.deleteUser {
  color:lightsalmon;
}
</style>


