const util = require('../../utils/util');
Page({
  data: {
    navIndex:0,
    chargeArr:[]
  },
  chooseItem(e){
    this.setData({
      navIndex: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id,
    })
  },
  quanList() {
    util.requests('/business/dictionary/getDictionaryListByCode', { code:'BUSINESS_RECHARGE_ACTIVITY'}).then(res => {
      if (res.data.code == 0) {
        let arr=res.data.data.map(item=>{
          return {
            money : item.fee/100,
            money2 : item.balance / 100,
            id : item.id,
            number : item.balance
          }
        })
        this.setData({
          chargeArr: arr,
          id: res.data.data[0].id
        })
      }

    })
  },
  charge(){
    util.requests('/business/balance/recharge?activityId=' + this.data.id, {},'post').then(res => {
      if (res.data.code == 0) {
        wx.reLaunch({
          url: '/pages/rechargeSuccess/rechargeSuccess',
        })
      }

    })
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
    this.quanList()
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