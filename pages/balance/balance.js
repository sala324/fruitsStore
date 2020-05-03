const util = require('../../utils/util');
Page({
  data: {
    userData:{}
  },
  useDada(){
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          balance: (res.data.data.balance/100).toFixed(1)
        })
      }
      
    })
  },
  xianhuaList() {
    let userId = ''
    try {
      userId = wx.getStorageSync('userId')
    } catch (e) {
      console.log('获取本地存储失败！')
    }
    util.requests('/business/balance/getBalanceBill', { 
      id: userId,
      current: 1,
      size: 10
       }).then(res => {
      if (res.data.code == 0) {
        res.data.data.records.forEach((val,index)=>{
          val.number = (val.number/100).toFixed(1)
        })
        this.setData({
          xianhuaArr: res.data.data.records
        })
        if (res.data.data.records.length>0){
          this.setData({
            noData:false
          })
        } else {
          this.setData({
            noData: true
          })
        }
      }

    })
  },
  onShow: function () {
    this.xianhuaList()
    this.useDada()
  }
})