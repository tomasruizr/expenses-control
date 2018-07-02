<template>
<div id="goal-edit">
  <form @submit="submit">
    <h1>New goal</h1>
    <input type="text" v-model="data.name" placeholder="Name">
    <input type="text" v-model="data.budget" placeholder="Budget">
    <input type="text" v-model="data.amount" placeholder="Amount">
    <input type="text" v-model="data.timeToComplete" placeholder="Time To Complete">
    <input type="text" v-model="data.timeUnits" placeholder="Time Units">
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
