const util = require('../../utils/util');
Page({
  data: {

  },
  resgister(e) {
    wx.login({
      success: res => {
        if (res.code) {
          util.request('/business/user/register', {
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
          }, 'post').then(res => {
            console.log(456)
            if (res.data.code == 0) {
              try {
                wx.setStorageSync('token', res.data.data);
              } catch (e) {
                console.log('存储失败！')
              }
              wx.navigateBack({
                delat:1
              })
            } else {
              util.toasts('网络请求失败，点击重试', 2000)
            }
          })
        }
      }
    });
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})