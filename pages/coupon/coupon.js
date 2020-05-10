const util = require('../../utils/util');
Page({
  data: {
    navIndex:0,
    userCouponList:[],
    code:'',
    checkArr:[false,false,false],
    index:1,
    size:5
  },
  onShow() {
    this.setData({
      index: 1,
      userCouponList: []
    })
    this.couponList()
  },
  loadMore() {
    if (this.data.totalPage > this.data.index) {
      this.data.index++
      this.couponList()
    }
  },
  exchange(){
    if(!this.data.code){
      util.toasts('请输入兑换码')
    } else {
      util.requests('/business/coupon/exchangeCoupon', {
        exchangeCode: this.data.code
      }, 'post').then(res => {
        if (res.data.code == 0) {
          util.toasts('兑换成功')
          this.setData({
            index: 1,
            code: '',
            couponArr: []
          })
          this.couponList()
        }
      })
    }
    
  },
  couponList() {
    util.request('/business/coupon/getMyCouponList', {
      status: this.data.navIndex+1,
      current: this.data.index,
      size: this.data.size
    }).then(res => {
      if (res.data.code == 0) {
        let userCouponList = res.data.data.records;
        userCouponList.forEach(userCoupon => {
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
          userCouponList: this.data.userCouponList.concat(userCouponList),
          totalPage: res.data.data.pages
        })
        util.judgeData(this.data.userCouponList.length==0,'noData',this)
      }
    })
  },
  changeCode(e){
    this.setData({
      code:e.detail.value
    })
  },
  chooseNav(e){
    this.setData({
      navIndex: Number(e.currentTarget.dataset.id)
    })
    this.setData({
      index:1,
      userCouponList:[]
    })
    this.couponList()
  },
})