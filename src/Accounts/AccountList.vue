<template>
  <div id="account-list">
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
          <td><a href="#" @click="$emit('edit', account, index)" class="list-edit">Edit</a></td>
          <td><a href="#" @click="remove(account, index)" class="list-delete">Delete</a></td>
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