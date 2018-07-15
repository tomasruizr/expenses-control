<template>
  <div>
    <!-- <a class="button is-link is-outlined" href="#" @click='showTransfer'>Make a transfer</a> -->
    <form @submit="submit" id="transfer-detail" class="column is-5">
      Origin:
      <div class="select">
        <select name="origin" id="origin" v-model="data.origin">
          <option v-for="(item) in items" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      Destination:
      <div class="select">
        <select name="destination" id="destination" v-model="data.destination">
          <option v-for="(item) in items" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      Amount:
      <input class="input" type="text" name="amount" id="amount" v-model="data.amount">
      <input class="button is-primary is-outlined" type="submit" value="Transfer">
    </form>
  </div>
</template>
<script>

import mainMixin from '../mixins/main.mixin.js';
export default {
  name: 'transfer-edit',
  mixins: [mainMixin],
  props:{
    baseUrl: String,
    http: Function,
    type: String
  },
  computed: {
    items() {
      return this.$store.state[`${this.type}s`];
    },
  },
  data(){
    return {
      data : {},
    };
  },
  methods: {
    submit( event ){
      event.preventDefault();
      this.data.type = this.type.charAt( 0 ).toUpperCase() + this.type.slice( 1 );
      this.http( `${this.baseUrl}/operation/makeTransfer`, { method: 'POST', body: JSON.stringify( this.data ) }).then(() => {
        this.$emit( 'saved', this.data );
      });
      this.data = {};
      this.$emit( 'saved' );
    }
  }
};
</script>
