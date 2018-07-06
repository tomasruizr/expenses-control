export default {
  props : {
    model: { type: Object }
  },
  data(){
    return {
      showEdit:false,
      inNew: true
    };
  },
  mounted(){
    // this.init( this.model );
  },
};
