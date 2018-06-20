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
    delete(){},
    save(){
      let promise;
      if ( this.isNew ){
        promise = this.model.post( this.data );
      }
      else{
        promise = this.model.put( this.userData );
      }
      return promise;
    },
    reset(){
      this.data = {};
    }
  }
};
