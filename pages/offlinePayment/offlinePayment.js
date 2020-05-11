const util = require('../../utils/util');
var app = getApp()
Page({
  data: {
    money:''
  },
  payMoney() {
    util.requests('/business/order/createOffline', {
      totalPrice:this.data.money*100
      // current:this.data.index,
      // size: this.data.size
    },'post').then(res => {
      if (res.data.code == 0) {
        wx.switchTab({
          url: '/pages/orderList/orderList',
        })
      }

    })
  },
  onLoad: function (options) {

  },
  changeMoney(e){
    this.setData({
      money:e.detail.value
    })
  },
  backBtn(){
    if (this.data.money>0){
      this.payMoney()
      
    } else {
      wx.showToast({
        title: '请输入商品金额',
        icon: 'none',
      })
    }
    
  },
  onShow: function () {
    this.setData({
      balance:app.globalData.balance
    })
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