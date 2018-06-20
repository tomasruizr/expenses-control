<template>
  <div id="user-list">
    <h1>Users</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </thead>
      <tbody id="users">
        <tr v-for="(user, index) in data" :key= "user.id">
          <td><a href="#" @click="$emit('edit', user, index)" class="editUser">Edit</a></td>
          <td><a href="#" @click="remove(user, index)" class="deleteUser">Delete</a></td>
          <td>{{user.id}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.email}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'user-list',
  props:{
    data: Array
  },
  methods:{
    edit( user, index ){
      this.$emit( 'edit', user, index );
    },
    remove( user, index ){
      this.$emit( 'delete', user, index );
      this.data.splice( index, 1 );
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


