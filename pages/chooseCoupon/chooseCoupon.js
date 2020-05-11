const util = require('../../utils/util');
Page({
  data: {
    userCouponList: [],
    orderItemList: [],
    couponValue: 0
  },
  onLoad(options) {
    let checkedIdListStr = options.checkedIdList || "";
    let checkedIdList = checkedIdListStr.split(",").filter(item => item).map(Number);
    this.setData({
      youhui:Number(options.youhui),
      hejiMoney: Number(options.hejiMoney),
      dikou: Number(options.dikou),
    })
    // 计算购物车
    this.initCartList();
    // 渲染优惠券列表
    util.request('/business/coupon/getMyCouponList?status=1').then(res => {
      let userCouponList = res.data.data.records;
      userCouponList.forEach(userCoupon => {
        userCoupon.checked = checkedIdList.indexOf(userCoupon.id) > -1;
        // 格式化部分文描
        let item = userCoupon.coupon;
        if (item.dateType==2){
          item.endTime = item.endTime.replace(' 00:00:00', '')
          item.startTime = item.startTime.replace(' 00:00:00', '')
        }
        if (item.dateType==1){
          item.time1 = util.jisuanDate(userCoupon.gmtCreate, item.effectiveTime)
        }
        item.arr2 = item.description.split('\r\n')
      });
      this.setData({
        userCouponList: userCouponList
      });
      // 计算优惠券互斥情况
      this.checkCouponMutex();
    })
  },
  initCartList(){
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
    };
    this.setData({
      orderItemList: orderItemList
    });
  },
  confirm() {
    let pages = getCurrentPages(),
        prePage = pages[pages.length - 2],
        checkedIdList = [];
    this.data.userCouponList.filter(item => item.checked).forEach(item => checkedIdList.push(item.id));
    prePage.setData({
      checkedIdList: checkedIdList,
      couponValue: this.data.couponValue,
    });
    wx.navigateBack({
      delta: 1
    })
  },
  checkCouponMutex() {
    util.requests('/business/coupon/checkOrderCoupon', {
      userCouponList: this.data.userCouponList,
      orderItemList: this.data.orderItemList
    }, 'post').then(res => {
      let data = res.data.data;
      let couponValue = data.couponValue;
      // 优惠总金额
      this.setData({
        couponValue: couponValue
      });
      // 互斥优惠券设置
      let list = this.data.userCouponList;
      let map = new Map();
      list.forEach(item => {
        item.tips = null;
        map.set(item.id, item);
      });
      let itemList = data.itemList;
      itemList.forEach(item => {
        map.get(item.id)["enable"] = item.enable;
        if (item.enable) return;
        map.get(item.id)["tips"] = item.tips;
      })
      this.setData({
        userCouponList: list
      });
    })
  },
  switchChecked(e) {
    let detail = e.detail;
    let list = this.data.userCouponList;
    list.filter(item => item.id === detail.id).forEach(item => item.checked = detail.checked);
    this.setData({
      userCouponList: list
    });
    this.checkCouponMutex();
  },
  showAbout(e){
    // 切换描述
  },
})