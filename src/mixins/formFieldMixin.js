export default {
  props: ['title', 'naming', 'placeholder', 'value', 'error'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
