<template>
<div id="operations-edit">
  <form @submit="submit">
    <h1>New Operations</h1>
    <input type="text" v-model="data.type" placeholder="Type">
    <input type="text" v-model="data.name" placeholder="Name">
    <input type="text" v-model="data.amount" placeholder="Amount">
    <input type="text" v-model="data.budget" placeholder="Budget">
    <input type="text" v-model="data.description" placeholder="Description">
    <input type="text" v-model="data.account" placeholder="Account">
    <input type="text" v-model="data.tags" placeholder="Tags">
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
