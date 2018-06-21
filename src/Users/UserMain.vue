<template>
  <div id="user-main">
    <user-edit :data="editUser" @saved="editSaved"/>
    <user-list :data="users" @edit="listEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import model from '../Api/model';
import userModel from './userModel';
import UserList from './UserList.vue';
import UserEdit from './UserEdit.vue';
let user;
export default {
  name:'user-main',
  components: { UserList, UserEdit },
  data(){
    return {
      isNew:true,
      users:[],
      editUser:{}
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init( modelInstance ){
      user = userModel( modelInstance || model );
      return user.get().then(( data ) => {
        console.log( 'asigne la data' );
        this.users = data;
      });
    },
    editSaved( data ){
      this.editUser = {};
      let method = this.isNew ? 'post' : 'put';
      user[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.users.push( response );
      });
      this.isNew = true;
    },
    listEdit( user ){
      this.isNew = false;
      this.editUser = user;
    },
    listDelete( data ){
      user.delete( data.id );
    },
  }
};
</script>
