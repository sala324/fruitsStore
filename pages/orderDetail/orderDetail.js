const util = require('../../utils/util');
Page({
  data: {
    price:0,
    allnum:0,
    hejiMoney:0,
    status:'',
    orderDelivery:{},
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
  orderDetail() {
    let that = this
    util.requests('/business/order/getOrderById', {
      id: this.data.id
    }).then(res => {
      if (res.data.code == 0) {
        let num=0
        if (res.data.data.orderItemList.length>0){
          res.data.data.orderItemList.forEach((val, index) => {
            val.price = val.price 
            val.price1 = val.price * val.number/100
            val.price2 = val.originPrice *val.number/100
            num += val.number
          })
        } else {
          let json={}
          json.number=1
          json.price1 = res.data.data.totalFee / 100
          json.price2 = res.data.data.totalFee / 100
          json.price = res.data.data.totalFee / 100
          json.thumbnails = '../../images/icon/product.jpg'
          res.data.data.orderItemList.push(json)
        }
        let that=this
        if (res.data.data.status == 0) {
          countDown()
          function countDown(){
            let times = res.data.data.gmtCreate.replace(/-/g, '/')
            res.data.data.end_date = Date.parse(new Date(times)) / 1000 + 30 * 60
            restTime = res.data.data.end_date - Date.parse(new Date()) / 1000

            let sytime = ''
            if (restTime <= 0) {
              clearInterval(tt);
            }
            // let starthours = Math.floor(restTime % 86400 / 3600)
            let startMinutes = Math.floor(restTime % 86400 % 3600 / 60)
            let startSec = Math.floor(restTime % 86400 % 3600 % 60 % 60)
            sytime = startMinutes + '分钟' + startSec + '秒'
            restTime = restTime - 1
            res.data.data.restTime = restTime
            res.data.data.sytime = sytime
            that.setData({
              sytime: sytime
            })
          }
          this.setData({
            tt: setInterval(countDown, 1000)
          })
        }
        this.setData({
          orderInfo: res.data.data,
          status: res.data.data.status,
          orderDelivery: res.data.data.orderDelivery,
          orderArr: res.data.data.orderItemList,
          allnum: num
        })
      }
    })
  },
  onShow: function () {
    this.orderDetail()
  },
  onUnload: function () {
    let tt = this.data.tt;
    clearInterval(tt)
  },
  deleteBtn() {
    let that = this
    util.requests('/business/order/delete', {
      id: that.data.id
    }, 'post').then(res => {
      if (res.data.code == 0) {
        util.dialog('订单删除成功')
      }
    })
  },
  deleteOrder() {
    let that = this
    wx.showModal({
      content: '是否删除订单',
      success: function (res) {
        if (res.confirm) {
          that.deleteBtn()
        }
      }
    })
  },
  cancel() {
    let that = this
    util.requests('/business/order/cancel', {
      id: this.data.id
    },'post').then(res => {
      if (res.data.code == 0) {
        util.toasts('订单取消成功')
        that.orderDetail()
      }
    })
  },
  cancelOrder(){
    let that=this
    wx.showModal({
      content: '是否取消订单',
      success: function (res) {
        if (res.confirm) {
          that.cancel()
        }
      }
    })
  },
  payOrder() {
    util.requests('/business/order/pay', {
      orderId: this.data.id
    }).then(res => {
      if (res.data.code == 0) {
        wx.reLaunch({
          url: '/pages/paySuccess/paySuccess',
        })
      }
    })
  },
  onLoad(options){
    this.setData({
      id:options.id
    })
  }
})