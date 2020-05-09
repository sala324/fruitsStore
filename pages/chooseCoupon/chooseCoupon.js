const util = require('../../utils/util');
Page({
  data: {
    navIndex:0,
    couponArr:[],
    code:'',
    index:1,
    size:5
  },
  onShow() {
    this.setData({
      index: 1,
      couponArr: []
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
        res.data.data.records.forEach((val,index)=>{
          val.checked=false
          if (val.dateType==2){
            val.endTime = val.endTime.replace(' 00:00:00', '')
            val.startTime = val.startTime.replace(' 00:00:00', '')
          }
          if (val.dateType==1){
            val.time1 = util.jisuanDate(val.gmtCreate, val.effectiveTime)
            console.log(util.jisuanDate(val.gmtCreate, val.effectiveTime))
          }
          val.arr2 = val.description.split('\r\n')
        })
        this.setData({
          couponArr: this.data.couponArr.concat(res.data.data.records),
          totalPage: res.data.data.pages
        })
        util.judgeData(res.data.data.records.length==0,'noData',this)
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
      couponArr:[]
    })
    this.couponList()
  },
  showAbout(e){
    let arr = this.data.couponArr
    arr[e.currentTarget.dataset.index].checked = !arr[e.currentTarget.dataset.index].checked
    this.setData({
      couponArr:arr
    })
  },
})