<template>
<div id="account-edit">
  <form @submit="submit">
    <h1>{{formTitle}}</h1>
    <input type="text" v-model="data.name" placeholder="Name">
    <input type="text" v-model="data.balance" placeholder="Balance">
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
    },
    formTitle: {
      type: String,
      default: 'New Account'
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
