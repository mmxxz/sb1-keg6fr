Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    },
    avatar: {
      type: String,
      value: ''
    },
    arrow: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
})