const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    isCertificate:false,
    bindBank: false,
    tradeLogo: false,
    isCompanyer: false,
    showmask:false,
    balance:''
  },
  onLoad(){
    
  },
  quit(){
    
  },
  useDada() {
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          userData: res.data.data,
          shareCode: res.data.data.shareCode,
          balance: (res.data.data.balance/100).toFixed(1)
        })
        wx.setStorageSync('userId', res.data.data.id);
      }

    })
  },
  onShow: function () {
    this.useDada()
  }
})