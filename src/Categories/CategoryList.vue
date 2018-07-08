<template>
  <div id="category-list">
    <h1>Categories</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>Name</th>
      </thead>
      <tbody id="categories">
        <tr v-for="(category, index) in data" :key= "category.id">
          <td><a href="#" @click="$emit('edit', category, index)" class="editCategory">Edit</a></td>
          <td><a href="#" @click="$emit( 'delete', category, index )" class="deleteCategory">Delete</a></td>
          <td>{{category.id}}</td>
          <td>{{category.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'category-list',
  props:{
    data: Array
  },
  methods:{
    edit( category, index ){
      this.$emit( 'edit', category, index );
    },
    remove( category, index ){
      this.$emit( 'delete', category, index );
    }
  }
};
</script>

<style lang="scss">
table th {
  padding: 5px
}
.editCategory {
  color: green;
}
.deleteCategory {
  color:lightsalmon;
}
</style>


