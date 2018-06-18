<template>
  <div class="container the-form">
    <form @submit.prevent="submit">
        <div class="field control">
          <label class='label' for="name">Nombre:</label>
          <input placeholder="Nombre" class="input is-primary" type="text" name="name" id="name" v-model="name">
        </div>
        <div class='field control'>
          <label class='label' for="Apellido">Apellido:</label>
          <input placeholder="Apellido" class="input is-primary" type="text" name="lastName" id="lastName" v-model="lastName">
        </div>
        <!-- <div class='field control'>
          <label class='label' for="email">email:</label>
          <input placeholder="email" class="input is-primary" type="text" name="email" id="email" v-model="email">
        </div> -->
        <div class='field control'>
          <input class="button is-primary" type="submit" value="Create">
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'form-base',
  data () {
    return {
      name:  '',
      lastName: '',
      // email:''
    }
  },
  methods:{
    submit(){
           this.$axios.post('http://localhost:1337/record', this.$data)
        .then(console.log)
        .catch(error=>console.log(error.response.data.details))   
    }
  }
}
</script>

<style lang="scss" scoped>
#the-form{
  margin-top: 20px;
  padding: 30px;
}
</style>