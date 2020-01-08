export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    parentName () {
      return this.parentItem.path
    },
    children () {
      return this.parentItem.children
    },
    textColor () {
      return this.theme === 'dark' ? '#afb5bc' : '#495060'
    }
  }
}
