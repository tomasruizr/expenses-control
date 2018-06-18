export default {
  data() {
    return {
      model: {},
      data:[]
    };
  },
  props: {
    data: Object,
    filter: String
  },
  mounted(){
    if ( this.data ){}
  },
  methods: {
    async load( filter ){
      let res = await this.model.get( filter );
      this.fillData( res );
      this.$emit( 'loaded', res );
    },
    async edit( id, index ){
      let res = await this.model.put( id, this.data[index]);
      this.$emit( 'edited', res );
    },
    async remove( id, index ){
      let res = await this.model.delete( id );
      this.$emit( 'deleted', res );
      this.data.splice( index, 1 );
    },
    //Override this as needed
    fillData( res ){
      this.data = res;
    }
  }
};
