<template>
<div id="category-edit" class="column is-5">
  <form @submit="submit">
    <h1>{{formTitle}}</h1>
    <input class="input" type="text" v-model="data.name" placeholder="Name">
    <label class="checkbox"><input type="checkbox" v-model="data.isDeposit">Is Income</label>
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
      default: 'New Category'
    }
  }
};
</script>
