// pages/coupon/coupon.js
Page({
  data: {
    navIndex:0,
    checkArr:[false,false,false]
  },
  onLoad: function (options) {

  },
  chooseNav(e){
    this.setData({
      navIndex: e.currentTarget.dataset.id
    })
  },
  showAbout(e){
    let arr=this.data.checkArr
    arr[e.currentTarget.dataset.index] = !arr[e.currentTarget.dataset.index]
    this.setData({
      checkArr:arr
    })
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