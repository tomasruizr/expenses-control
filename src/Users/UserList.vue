<template>
  <div id="user-list">
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
          <td><a href="#" @click="$emit('edit', user, index)" class="list-edit">Edit</a></td>
          <td><a href="#" @click="remove(user, index)" class="list-delete">Delete</a></td>
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
    }
  }
};
</script>


