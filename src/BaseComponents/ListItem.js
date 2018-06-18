export default {
  methods: {
    save(){
      this.$emit( 'save', this.data.id );
    },
    delete(){
      this.$emit( 'delete', this.data.id );
    }
  }
};
