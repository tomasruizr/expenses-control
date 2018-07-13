export default {
  props : {
    model: { type: Object }
  },
  data(){
    return {
      showEdit:false,
      isNew: true
    };
  },
  methods:{
    onError( err ){
      this.$emit( 'error', err );
      alert( err.code );
    }
  }
};
