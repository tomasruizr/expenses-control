/**
 * Convention over Configuration. Data Object for edition will always be editData
 * @param {string} name the name of the model
 * @param {bool} createData Whether to create the data object property
 */
export default {
  props:{
    index: Number
  },
  methods:{
    submit( event ){
      event.preventDefault();
      this.$emit( 'saved', this.data, this.index );
    }
  }
};
