<template>
<div id="budget-edit" class="column is-5">
  <form @submit="submit">
    <h1>{{formTitle}}</h1>
    <input class="input" type="text" v-model="data.name" placeholder="Name">
    <input class="input" type="text" v-model="data.amount" placeholder="Amount">
    <input class="input" type="text" v-model="data.balance" placeholder="Balance">
    <input class="button is-primary is-outlined" type="submit" :value="btnCaption">
    <a class="button is-link is-outlined" @click="$emit('cancel')" href="#">Cancel</a>
  </form>
</div>
</template>
<script>
import editViewMixin from '../mixins/edit.view.mixin.js';
export default {
  mixins:[editViewMixin],
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
  }
};
</script>
