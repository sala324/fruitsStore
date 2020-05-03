const util = require('../../utils/util');
Page({
  data: {
    userData: {},
    index: 1, 
    xianhuaArr:[]
  },
  loadMore() {
    if (this.data.totalPage > this.data.index) {
      this.data.index++
      this.xianhuaList()
    }
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
      current: this.data.index,
      size: 16}).then(res => {
      if (res.data.code == 0) {
        res.data.data.records.forEach((val, index) => {
          val.number = (val.number / 100).toFixed(1)
        })
        this.setData({
          xianhuaArr: this.data.xianhuaArr.concat(res.data.data.records)
        })
      }

    })
  },
  onShow: function () {
    this.setData({
      index:1,
      xianhuaArr:[]
    })
    this.xianhuaList()
  }
})