<template>
<div id="budget-edit">
  <form @submit="submit">
    <h1>{{formTitle}}</h1>
    <input type="text" v-model="data.name" placeholder="Name">
    <input type="text" v-model="data.amount" placeholder="Amount">
    <label><input type="checkbox" v-model="data.isPercentage" placeholder="Is Percentage">Is percentage</label>
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
      default: 'New Budget'
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
