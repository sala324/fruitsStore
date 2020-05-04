const util = require('../../utils/util');
Page({
  data: {
    address:'',
    linkMan:'',
    mobile:'',
    price:0,
    allnum:0,
    hejiMoney:0,
    orderArr:[],
    orderArr2: [],
    showAll:false,
    youhuiprice:0,
    showItem:3,
    id:'',
    showText:'展开更多'
  },
  chooseAddress(){
    wx.navigateTo({
      url: '/pages/addressList2/addressList2?id='+this.data.id,
    })
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
  showCart1() {
    this.setData({
      showCart: true
    })

  },
  defaultAddress(){
    util.requests('/business/address/getDefaultAddress', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          address: res.data.data.building + ' ' + res.data.data.detail,
          linkMan: res.data.data.deliveryName,
          mobile: res.data.data.contactNumber,
          id: res.data.data.id,
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
    let arrs2 = []
    for (var p in jsons) {
      let json2={}
      var json = jsons[p]
      if (json.checked){
        json.id = Number(p)
        json2.productId = Number(p),
        json2.productId = Number(p),
        json2.number = Number(json.num),
        arrs.push(json)
        arrs2.push(json2)
      }
      
    }
    let num = 0
    let price = 0
    let youhui=0
    arrs.forEach((val2, index2) => {
      if(val2.checked){
        num += val2.num
        price += val2.price * val2.num
        val2.price1 = val2.price * val2.num
        val2.price2 = val2.originPrice * val2.num
        if (val2.originPrice > val2.price) {
          youhui += (val2.originPrice - val2.price) * val2.num
        }
      }
      
    })
    price = price.toFixed(1)
    let price3 = 0
    let dikou = 0
    if (this.data.allBalance-price>=0){
      dikou = price
    } else {
      price3 = price - this.data.allBalance
      dikou = this.data.allBalance
    }

    this.setData({
      dikou: dikou,
      price: price,
      allnum: num,
      hejiMoney: price3,
      orderArr: arrs,
      orderArr2:arrs2,
      youhuiprice: youhui
    })
  },
  setOrder(){
    util.requests('/business/order/create', {
      addressId: this.data.id,
      orderItemList:this.data.orderArr2
    },'post').then(res => {
      if(res.data.code==0){
        wx.setStorageSync('cartArr', {})
        util.requests('/business/order/pay', {
          orderId: res.data.data
        }).then(res => {
          if(res.data.code==0){
            wx.reLaunch({
              url: '/pages/paySuccess/paySuccess',
            })
          }
        })
        // wx.requestPayment({
        //   timeStamp: res.data.data.timeStamp + '',
        //   nonceStr: res.data.data.nonceStr,
        //   package: res.data.data.package,
        //   signType: res.data.data.signType,
        //   paySign: res.data.data.paySign,
        //   success(res) {
        //     console.log(res)
        //     // wx.redirectTo({
        //     //   url: '/pages/renovation/paySuccess/paySuccess?order_form_id=' + that.data.order_form_id
        //     // })

        //   },
        //   fail(res) {
        //     util.toasts('支付失败')
        //   }
        // });
      }
    })
  },
  onLoad(){
    this.defaultAddress()
  },
  useDada() {
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          allBalance: (res.data.data.balance / 100).toFixed(1)
        })
        this.gouwuche()
      }
    })
  },
  onShow: function () {
    this.useDada()
  }
})