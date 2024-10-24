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
    options: {
      type: Array,
      value: []
    },
    placeholder: {
      type: String,
      value: '请选择'
    },
    required: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onChange(e) {
      const { value } = e.detail;
      this.triggerEvent('change', { value });
    }
  }
})