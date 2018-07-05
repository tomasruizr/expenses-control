<template>
  <div id="user-main">
    <user-edit :data="editUser" @saved="editSaved"/>
    <user-list :data="users" @edit="listEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import UserList from './UserList.vue';
import UserEdit from './UserEdit.vue';
export default {
  name:'user-main',
  components: { UserList, UserEdit },
  props : {
    model: { type: Object }
  },
  data(){
    return {
      user: {},
      isNew:true,
      users:[],
      editUser:{}
    };
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.user = modelInstance;// || this.isSocket ? socket : model );
      if ( this.user.on ){
        this.user.on( 'user', this.manageSocketEvent );
      }
      return this.user.get().then(( data ) => {
        this.users = data.body;
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.users.push( message.data );
      } 
      let index = this.users.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.users.splice( index,1 );
      else if ( message.verb === 'updated' )
        this.users.splice( index,1, message.data );
        // this.users[index] = message.data;
    },

    editSaved( data ){
      this.editUser = {};
      let method = this.isNew ? 'post' : 'put';
      this.user[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.users.push( response.body );
      });
      this.isNew = true;
    },
    listEdit( user ){
      this.isNew = false;
      this.editUser = user;
    },
    listDelete( data, index ){
      this.user.delete( data.id ).then(() => {
        this.users.splice( index, 1 );
      });
    },
  }
};
</script>
