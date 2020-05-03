const util = require('../../utils/util');
Page({
  data: {
    nodata:false,
    orderArr:[],
    index:1,
    isLogin: true,
    size:8
  },
  orderAgain(e){
    let arr=[]
    console.log(e)
    let arr2 = this.data.orderArr[e.currentTarget.dataset.index].orderItemList
    arr2.forEach((val,index)=>{
      arr.push(val.productId)
    })
    util.requests('/business/product/getProductListByIdList', {
      productIdList: arr.join(',')
    }).then(res => {
      if (res.data.code == 0) {
        let jsonIn2 = {}
        if (res.data.data.length == arr2.length){
          res.data.data.forEach((val, index) => {
            let json = {}
            let json2 = {}
            if (val.status == 0) {
              arr2.forEach((val2, index2) => {
                if (val.id == val2.productId) {
                  json.num = val2.number
                  console.log(val2.number)
                }
              })
              json.originPrice = val.originPrice
              json.price = val.price / 100
              json.id = val.id
              json.thumbnails = val.thumbnails
              json.title = val.title
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
    // wx.navigateTo({
    //   url: '/pages/setOrder/setOrder',
    // })
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
  cunchu() {
    console.log(1)
    let jsons = {}
    try {
      jsons = wx.getStorageSync('cartArr')
    } catch (e) {
      return false;
    }
    if (jsons) {
      let arrs = []
      for (var p in jsons) {
        var json = jsons[p]
        json.id = Number(p)
        arrs.push(json)
      }
      let num = 0
      let price = 0
      arrs.forEach((val, index) => {
        num += val.num
        price += val.price * val.num
      })
      if (num > 0) {
        this.setData({
          noData: false
        })
      } else {
        this.setData({
          noData: true
        })
      }
      if (num > 0) {
        wx.setTabBarBadge({
          index: 1,
          text: num + ''
        })
      } else {
        wx.removeTabBarBadge({
          index: 1
        })
      }

      this.setData({
        storageArr: arrs,
        cartData: true,
        allnum: num,
        price: price
      })
      // console.log(this.data.productArr)
    }

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
          console.log(val)
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
        if (res.data.data.records.length==0){
          that.setData({
            nodata:true
          })
        } else {
          that.setData({
            nodata: false
          })
        }
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
    this.orderList()
    this.cunchu()
  }
})