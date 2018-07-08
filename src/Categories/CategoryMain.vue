<template>
  <div id="category-main">
    <category-edit v-show="showEdit" :title="editTitle" :data="editData" @saved="editSaved" @cancel="showEdit=false"/>
    <button @click="showEdit=true" v-show="!showEdit">Add Category</button>
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
    listMixin( 'category', false ),
    editMixin( 'category' ),
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
<style lang="scss">
#category-main {
  margin-top: 50px;
}
</style>
