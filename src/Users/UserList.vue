<template>
  <div id="user-list">
    <h1>Users</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </thead>
      <tbody id="users">
        <tr v-for="(user, index) in data" :key= "user.id">
          <td><a href="#" @click="remove(user.id, index)" class="deleteUser">Delete</a></td>
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
import user from './userModel';
import List from '../BaseComponents/List';
export default {
  mixins: [List],
  name: 'user-list',
  data: function() {
    return {
      model: user
    };
  },
  mounted: function() {
    this.load();  
  },
};
</script>

<style lang="scss">
table th {
  padding: 5px
}
.deleteUser {
  color: green;
}
</style>


