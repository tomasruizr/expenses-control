<template>
<div id="user-edit" class="column is-5">
  <form @submit="submit">
    <h1>New user</h1>
    <input class="input" type="text" v-model="data.firstName" placeholder="First Name">
    <input class="input" type="text" v-model="data.lastName" placeholder="Last Name">
    <input class="input" type="text" v-model="data.email" placeholder="email">
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
