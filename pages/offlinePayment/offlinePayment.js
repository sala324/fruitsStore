// pages/offlinePayment/offlinePayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeMoney(e){
    this.setData({
      money:e.detail.value
    })
  },
  backBtn(){
    if (this.data.money>0){
      wx.switchTab({
        url: '/pages/orderList/orderList',
      })
    } else {
      wx.showToast({
        title: '请输入商品金额',
        icon: 'none',
      })
    }
    
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