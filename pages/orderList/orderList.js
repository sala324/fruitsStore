// pages/orderList/orderList.js
Page({
  data: {
    price: 0,
    allnum: 0,
    hejiMoney:0,
    orderArr:[]
  },
  orderAgain(){
    console.log(123)
    wx.navigateTo({
      url: '/pages/setOrder/setOrder',
    })
  },
  turnDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?state=' + e.currentTarget.dataset.state,
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

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
    let youhui = 0
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
      orderArr: arrs,
      youhuiprice: youhui
    })
  },
  onShow: function () {
    this.gouwuche()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  reAppMessage: function () {

  }
})