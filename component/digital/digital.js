Component({
  properties: {
    productNum: Number,
    productIndex: Number
  },
  data: {
   
  },
  methods: {
    changeItem(e){
      let json = {}
      this.data.productNum = this.data.productNum + Number(e.currentTarget.dataset.num)
      this.setData({
        productNum: this.data.productNum
      })
      json.num = this.data.productNum
      json.index = this.data.productIndex
      this.triggerEvent('myevent', json)
    }
  }
})