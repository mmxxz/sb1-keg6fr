Component({
  properties: {
    label: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    placeholder: {
      type: String,
      value: ''
    },
    required: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onInput(e) {
      const { value } = e.detail;
      this.triggerEvent('change', { value });
    }
  }
})