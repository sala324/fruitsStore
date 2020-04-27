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
  getUserInfo() {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            if (res.userInfo.avatarUrl.replace("/132", "/0") == that.data.userData.avatar_url.replace(app.globalData.urlHost, "")){
              console.log('相同')
            } else {
              that.setAtval(res.userInfo.avatarUrl.replace("/132", "/0"))
            }
            if (res.userInfo.nickName == that.data.userData.user_name) {

            } else {
              that.setNickname(res.userInfo.nickName)
            }
            // that.setAtval(res.userInfo.avatarUrl.replace("/132", "/0"))
            // that.setNickname(res.userInfo.nickName)
          }
        })
      }
    });
  },
  bindGetUserInfo: function (e) {
    this.setNickname(e.detail.userInfo.nickName)
    this.setAtval(e.detail.userInfo.avatarUrl.replace("/132", "/0"))
    this.setData({
      showmask: false
    })
  },
  onShow: function () {
    this.getUserDetail()
    this.getsanyaosu()
  }
})