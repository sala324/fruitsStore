const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    isCertificate:false,
    bindBank: false,
    tradeLogo: false,
    isCompanyer: false,
    showmask:false
  },
  onLoad(){
    
  },
  useDada() {
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          userData: res.data.data
        })
        wx.setStorageSync('userId', res.data.data.id);
      }

    })
  },
  onShow: function () {
    this.useDada()
  }
})