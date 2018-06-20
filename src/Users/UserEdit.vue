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
export default {
  props:{
    data: Object,
    btnCaption: {
      type: String,
      default: 'Save'
    }
  },
  methods:{
    submit( event ){
      event.preventDefault();
      this.$emit( 'saved', this.data );
    }
  }
};
</script>
