// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shareCode: options.shareCode
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
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '来郭鲜生，新鲜时蔬任您挑。',
      imageUrl: 'https://caojiantao.site:8080/732fe900-4e07-4f12-9f6b-1dd3447f3a4d.png',
      path: '/pages/index/index?shareCode={{shareCode}}',
      success: function (res) {
        console.log(成功)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})