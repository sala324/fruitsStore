const util = require('../../utils/util');
Page({
  data: {
    userData: {}
  },
  xianhuaList() {
    let userId = ''
    try {
      userId = wx.getStorageSync('userId')
    } catch (e) {
      console.log('获取本地存储失败！')
    }
    util.requests('/business/flower/getFlowerBill', { userId: userId}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          xianhuaArr: res.data.data
        })
      }

    })
  },
  onShow: function () {
    this.xianhuaList()
  }
})