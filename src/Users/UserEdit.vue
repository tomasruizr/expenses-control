<template>
<div>
  <form @submit="submit">
    <h1>Add new user</h1>
    <input type="text" v-model="data.firstName" placeholder="First Name">
    <input type="text" v-model="data.lastName" placeholder="Last Name">
    <input type="text" v-model="data.email" placeholder="email">
    <input type="submit" :value="btnCaption">
  </form>
</div>
</template>
<script>
import user from './userModel';
import Form from '../BaseComponents/Form';
export default {
  mixins:[Form],
  data(){
    return {
      model: user
    };
  },
  props:{
    user: { 
      type:[ String, Object ],
      default: '' 
    }
  },
  mounted(){
    this.init();
    if ( this.user ){
      if( typeof this.user === 'object' ){
        this.data = this.user;
      } else {
        user.get( this.user ).then(( data ) => {
          this.data = data;
        });
      }
    }
  },
  methods:{
    submit: function( event ){
      event.preventDefault();
      this.save().then(( response ) => {
        this.$emit( 'saved', response );
        this.reset();
      }).catch(( error ) => {
        this.$emit( 'error', error );
      });
    }
  }
};
</script>
