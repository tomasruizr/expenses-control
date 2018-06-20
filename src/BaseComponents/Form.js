export default {
  data(){
    return {
      data: {},
      model: {},
      isNew: true,
      btnCaption: '',
    };
  },
  props: {
    btnAddCaption: { default:'Register', type:String },
    btnEditCaption: { default:'Save', type:String }
  },
  methods:{
    init(){
      this.btnCaption = this.isNew ? this.btnAddCaption : this.btnEditCaption;
    },
    onCreated( response ){
      this.$emit( 'created', response );
    },
    onEdited( response ){
      this.$emit( 'edited', response );
    },
    onError( response ){
      this.$emit( 'error', response );
    },
    delete(){},
    save(){
      if ( this.isNew ){
        this.model.post( this.data ).then( this.onCreated ).catch( this.onError );
      }
      else{
        this.model.put( this.data ).then( this.onEdited ).catch( this.onError );
      }
    },
    reset(){
      this.data = {};
    }
  }
};
