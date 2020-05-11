const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    balance:''
  },
  onLoad(){
    
  },
  quit(){
    
  },
  useDada() {
    if(!wx.getStorageSync('token')) return;
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      this.setData({
        userData: res.data.data,
        shareCode: res.data.data.shareCode,
        balance: res.data.data.balance/100
      })
      wx.setStorageSync('userId', res.data.data.id);
      app.globalData.balance = res.data.data.balance / 100
    })
  },
  onShow: function () {
    this.useDada()
  }
})