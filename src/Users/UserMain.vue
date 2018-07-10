<template>
  <div id="user-main">
    <h1>Users</h1>
    <button class="button is-primary" @click="showEdit=true" v-show="!showEdit">Add User</button>
    <user-edit v-show="showEdit" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <user-list :data="users" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import UserList from './UserList.vue';
import UserEdit from './UserEdit.vue';
import mainMixin from '../mixins/main.mixin.js';
import editMixin from '../mixins/edit.mixin.js';
import listMixin from '../mixins/list.mixin.js';
import socketMixin from '../mixins/socket.mixin.js';
export default {
  name:'user-main',
  mixins:[
    mainMixin,
    listMixin( 'user' ),
    editMixin( 'user' ),
    socketMixin( 'user' )
  ],
  components: { UserList, UserEdit },
  computed:{
    editTitle(){
      return this.isNew ? 'Create User' : 'Edit User';
    },
  }
};
</script>