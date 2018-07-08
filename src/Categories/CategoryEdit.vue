<template>
<div id="category-edit">
  <form @submit="submit">
    <h1>{{formTitle}}</h1>
    <input type="text" v-model="data.name" placeholder="Name">
    <a @click="$emit('cancel')" href="#">Cancel</a>
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
      default: 'New Category'
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
