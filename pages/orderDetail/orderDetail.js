const util = require('../../utils/util');
Page({
  data: {
    price:0,
    allnum:0,
    hejiMoney:0,
    status:0,
    orderArr:[],
    showAll:false,
    youhuiprice:0,
    showItem:3,
    showText:'展开更多'
  },
  showAll(){
    let showAll = this.data.showAll
    let length = this.data.orderArr.length
    if (this.data.showItem==3){
      this.setData({
        showItem: length,
        showText: '收起'
      })
      console.log(this.data.showItem)
    } else {
      this.setData({
        showItem: 3,
        showText: '加载更多'
      })
    }
    this.setData({
      showAll: !showAll
    })
  },
  gouwuche() {
    let jsons = {}
    try {
      jsons = wx.getStorageSync('cartArr')
    } catch (e) {
      console(e)
      return false;
    }
    let arrs = []
    for (var p in jsons) {
      var json = jsons[p]
      json.id = Number(p)
      arrs.push(json)
    }
    let num = 0
    let price = 0
    let youhui=0
    arrs.forEach((val2, index2) => {
      num += val2.num
      price += val2.price * val2.num
      val2.price1 = val2.price * val2.num
      val2.price2 = val2.originalPrice * val2.num
      youhui += (val2.originalPrice - val2.price) * val2.num
    })
    this.setData({
      price: price,
      allnum: num,
      hejiMoney: price,
      orderArr:arrs,
      youhuiprice: youhui
    })
  },
  onShow: function () {
    this.gouwuche()
  },
  cancelOrder(){
    wx.showModal({
      content: '是否取消订单',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  payOrder(){
    wx.redirectTo({
      url: '/pages/paySuccess/paySuccess',
    })
  },
  onLoad(options){
    console.log(options)
    this.setData({
      status:options.state
    })
    
  }
})