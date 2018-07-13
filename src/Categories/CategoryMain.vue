<template>
  <div id="category-main">
    <h1>Categories</h1>
    <button class="button is-primary" @click="showEdit=true" v-show="!showEdit">Add Category</button>
    <category-edit v-show="showEdit" :index="editIndex" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <category-list :data="categories" @edit="onEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import mainMixin from '../mixins/main.mixin.js';
import editMixin from '../mixins/edit.mixin.js';
import listMixin from '../mixins/list.mixin.js';
import socketMixin from '../mixins/socket.mixin.js';
import CategoryList from './CategoryList.vue';
import CategoryEdit from './CategoryEdit.vue';
export default {
  name:'category-main',
  mixins:[
    mainMixin,
    listMixin( 'categorie', false ),
    editMixin( 'categorie' ),
    socketMixin( 'category', 'categories' )
  ],
  components: { CategoryList, CategoryEdit },
  computed:{
    editTitle(){
      return this.isNew ? 'Create Category' : 'Edit Category';
    },
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>
