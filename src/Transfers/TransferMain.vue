<template>
  <div id="transfer-main">
    <a class="button is-link is-outlined" href="#" @click='showTransfer'>Make a transfer</a>
    <form @submit="submit" id="transfer-detail" v-show="showEdit" class="column is-5">
      Origin:
      <div class="select">
        <select name="origin" id="origin" v-model="data.origin">
          <option v-for="(account) in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
        </select>
      </div>
      Destination:
      <div class="select">
        <select name="destination" id="destination" v-model="data.destination">
          <option v-for="(account) in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
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
  name: 'transfer-main',
  mixins: [mainMixin],
  computed: {
    accounts() {
      return this.$store.state.accounts;
    },
  },
  data(){
    return {
      data : {},
    };
  },
  methods: {
    showTransfer(){
      this.showEdit = !this.showEdit;
    },
    submit( event ){
      event.preventDefault();
      this.model.transfer( this.data ).then(() => {
        console.log( 'listo' );
        this.$emit( 'saved', this.data );
      });
      this.showEdit = false;
      this.data = {};
    }
  }
};
</script>
