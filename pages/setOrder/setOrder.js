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
    showText:'展开更多',
    // 未使用优惠券列表(id > coupon)
    unusedCouponMap: new Map(),
    aviilableCouponNumber: 0,
    // 优惠券减免金额
    couponValue: 0,
    // 选中的优惠券
    checkedIdList: []
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
    arrs.filter(item => item.checked).forEach(item => {
      num += item.num
      price += item.price * item.num
      item.price1 = item.price * item.num
      item.price2 = item.originPrice * item.num
      if (item.originPrice > item.price) {
        youhui += (item.originPrice - item.price) * item.num
      }
    })
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
      userCouponIdList: this.data.checkedIdList,
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
    this.useDada();
    this.defaultAddress()
    this.getAvailableCoupon();
  },
  getAvailableCoupon () {
    // 计算购物车
    let cartArr = wx.getStorageSync('cartArr')
    let orderItemList = []
    for(let productId in cartArr) {
      let item = cartArr[productId];
      if(!item.checked) continue;
      orderItemList.push({
        productId: Number(productId),
        number: Number(item.num)
      })
    }
    util.requests('/business/coupon/getMyCouponList', {status: 1}).then(res => {
      let unusedCouponList = res.data.data.records;
      if(!unusedCouponList || unusedCouponList.length === 0) return;
      let map = new Map();
      unusedCouponList.forEach(item => {
        item.checked = false;
        map.set(item.id, item);
      });
      this.setData({
        unusedCouponMap: map
      })
      // 获取可用优惠券
      util.requests('/business/coupon/checkOrderCoupon', {
        userCouponList: unusedCouponList,
        orderItemList: orderItemList
      }, 'post').then(res => {
        let itemList = res.data.data.itemList;
        let num = itemList.filter(item => item.enable).length;
        this.setData({
          aviilableCouponNumber: num
        });
      })
    })
  },
  chooseCoupon() {
    wx.navigateTo({
      url: '/pages/chooseCoupon/chooseCoupon?checkedIdList=' + this.data.checkedIdList.join(",") + '&dikou=' + this.data.dikou + '&youhui=' + this.data.youhuiprice + '&hejiMoney=' + this.data.hejiMoney,
    })
  },
  useDada() {
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          allBalance: res.data.data.balance
        })
        this.gouwuche()
      }
    })
  },
  initCouponValue() {
    let checkedIdList = this.data.checkedIdList;
    let couponValue = 0;
    if (checkedIdList.length) {
      checkedIdList.forEach(id => {
        let coupon = this.data.unusedCouponMap.get(id);
        if (coupon.type === 0) {
          // 代金券
          couponValue += coupon.value / 100;
        } else if (coupon.type === 1) {
          // 折扣券
          let value = this.data.price * (100 - coupon.value)/100;
          couponValue += Number(value.toFixed(2));
        }
      })
    }
    this.setData({
      couponValue: couponValue
    });
  },
  initOrderPrice() {
    hejiMoney = this.data.hejiMoney - this.data.couponValue > 0 ? this.data.hejiMoney - this.data.couponValue : 0,
    dikou = this.data.hejiMoney - this.data.couponValue > 0 ? this.data.dikou : this.data.dikou + this.data.hejiMoney - this.data.couponValue,
    youhui = this.data.youhui + this.data.couponValue;
   this.setData({
      hejiMoney: hejiMoney,
      dikou: dikou,
      youhuiprice: youhui,
    });
  },
  onShow: function () {
    
    // 计算实付金额
    this.initOrderPrice();
  }
})