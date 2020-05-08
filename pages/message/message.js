const util = require('../../utils/util');
Page({
  data: {
    message:''
  },
  changeMessage(e){
    this.setData({
      message: e.detail.value
    })
  },
  sendMessage(val) {
    util.requests('/business/feedback/post', { content:val},'post').then(res => {
      if (res.data.code == 0) {
        util.dialog('您的留言发送成功')
      }
    })
  },
  backBtn() {
    if (this.data.message) {
      this.sendMessage(this.data.message)
    } else {
      wx.showToast({
        title: '请填写您的留言信息',
        icon: 'none',
      })
    }

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