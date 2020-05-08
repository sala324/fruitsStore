const util = require('../../utils/util');
const auth = require('../../utils/auth');
const cart = require('../../utils/cart');
Page({
  data: {
    nodata:false,
    orderArr:[],
    index:1,
    isLogin: auth.isLogin(),
    size:8
  },
  orderAgain(e){
    console.log(e)
    let arr2 = this.data.orderArr[e.currentTarget.dataset.index].orderItemList
    let arr=arr2.map(item=>{
      return item.productId
    })
    util.requests('/business/product/getProductListByIdList', {
      productIdList: arr.join(',')
    }).then(res => {
      if (res.data.code == 0) {
        if (res.data.data.length == arr2.length){
          let jsonIn2 = {}
          res.data.data.forEach((val, index) => {
            let json = {}
            let json2 = {}
            if (val.status == 0) {
              arr2.forEach((val2, index2) => {
                if (val.id == val2.productId) {
                  json.num = val2.number
                }
              })
              json.originPrice = val.originPrice
              json.price = val.price
              json.id = val.id
              json.thumbnails = val.thumbnails
              json.title = val.title
              json.checked = true
              json.description = val.description
              json2[val.id] = json
              jsonIn2 = Object.assign(json2, jsonIn2)
              wx.navigateTo({
                url: '/pages/setOrder/setOrder',
              })
            } else {
              util.toasts('订单存在已下架商品')
            }
          })
          wx.setStorageSync('cartArr', jsonIn2)
        } else {
          util.toasts('订单存在已下架商品')
        }
      }
    })
  },
  turnDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?status=' + e.currentTarget.dataset.status + '&id=' + e.currentTarget.dataset.id,
    })
  },
  loadMore(){
    if (this.data.totalPage > this.data.index) {
      this.data.index++
      this.orderList()
    }
  },
  orderTime() {
    util.request('/business/dictionary/getDictionaryListByCode', { code: 'BUSINESS_PAY_TIMEOUT' }).then(res => {
      if (res.data.code == 0) {
        
      }
    })
  },
  onLoad: function (options) {
    
  },
  deleteBtn(id) {
    let that = this
    util.requests('/business/order/delete', {
      id: id
    }, 'post').then(res => {
      if (res.data.code == 0) {
        util.toasts('订单删除成功')
        that.setData({
          index: 1,
          orderArr: []
        })
        that.orderList()
      }
    })
  },
  deleteOrder(e) {
    let that = this
    wx.showModal({
      content: '是否删除订单',
      success: function (res) {
        if (res.confirm) {
          that.deleteBtn(e.currentTarget.dataset.id)
        }
      }
    })
  },
  cancel(id) {
    let that = this
    util.requests('/business/order/cancel', {
      id: id
    }, 'post').then(res => {
      if (res.data.code == 0) {
        util.toasts('订单取消成功')
        that.setData({
          index: 1,
          orderArr: []
        })
        that.orderList()
      }
    })
  },
  cancelOrder(e) {
    let that = this
    wx.showModal({
      content: '是否取消订单',
      success: function (res) {
        if (res.confirm) {
          that.cancel(e.currentTarget.dataset.id)
        }
      }
    })
  },
  orderList() {
    let that=this
    util.request('/business/order/getOrderList', {
      current:this.data.index,
      size: this.data.size
    }).then(res => {
      if (res.data.code == 0) {
        
        res.data.data.records.forEach((val, index) => {
          let json=val
          let num = 0
          let price = 0
          let youhui = 0
          if (val.orderItemList){
            val.orderItemList.forEach((val2, index2) => {
              num += val2.number
              price += val2.price * val2.number/100
              val2.price1 = val2.price * val2.number/100
              val2.price2 = val2.originPrice * val2.number/100
              youhui += (val2.originPrice - val2.price) * val2.number/100
            })
            
          } else {
            num=1
          }
          json.num = num
          json.price = (val.totalFee/100).toFixed(1)
          json.youhui = youhui
        })
        util.judgeData(res.data.data.records.length==0,'noData',this)
        that.setData({
          orderArr: that.data.orderArr.concat(res.data.data.records),
          totalPage: res.data.data.pages,
          isLogin: true
        })
      } else if (res.data.code == 4){
        this.setData({
          isLogin:false
        })
      }

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
    this.setData({
      index:1,
      orderArr:[]
    })
    auth.isLogin() && this.orderList()
    cart.cunchu()
  }
})