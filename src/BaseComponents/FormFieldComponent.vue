<script>
export default {
  name: 'FormFieldComponent',
  render(createElement) {
    return createElement(
      this.tag,   // tag name
      this.$slots.default // array of children
    );
  },
  props: {
    tag: {
      type: String,
      required: true,
    },
  },  
}
</script>
