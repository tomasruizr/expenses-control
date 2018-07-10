<template>
<div id="goal-edit">
  <form @submit="submit">
    <h1>New goal</h1>
    <input class="input" type="text" v-model="data.name" placeholder="Name">
    <input class="input" type="text" v-model="data.budget" placeholder="Budget">
    <input class="input" type="text" v-model="data.amount" placeholder="Amount">
    <input class="input" type="text" v-model="data.timeToComplete" placeholder="Time To Complete">
    <input class="input" type="text" v-model="data.timeUnits" placeholder="Time Units">
    <input class="button is-primary is-outlined" type="submit" :value="btnCaption">
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
