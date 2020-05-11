Component({
  properties: {
    type: {
      type: String,
      value: "1"
    },
    userCoupon: Object,
    checkLogn:{
      type: Boolean,
      value: false
    },
    expand: {
      type: Boolean,
      value: false
    },
  },
  data: {
  },
  methods: {
    switchExpand() {
      this.setData({
        expand: !this.data.expand
      });
    },
    checkboxChange(e) {
      let value = e.detail.value;
      let id = this.data.userCoupon.id;
      // 通知父组件      
      this.triggerEvent('switchChecked', {
        id: id,
        checked: value.indexOf(String(id)) !== -1
      })
    }
  }
})