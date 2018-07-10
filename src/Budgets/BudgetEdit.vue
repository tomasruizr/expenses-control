<template>
<div id="budget-edit" class="column is-5">
  <form @submit="submit">
    <h1>{{formTitle}}</h1>
    <input class="input" type="text" v-model="data.name" placeholder="Name">
    <input class="input" type="text" v-model="data.amount" placeholder="Amount">
    <label class="checkbox"><input type="checkbox" v-model="data.isPercentage" placeholder="Is Percentage">Is percentage</label>
    <input class="button is-primary is-outlined" type="submit" :value="btnCaption">
    <a class="button is-link is-outlined" @click="$emit('cancel')" href="#">Cancel</a>
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
