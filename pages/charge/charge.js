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
    util.requests('/business/flower/getRechargeActivityList', {}).then(res => {
      if (res.data.code == 0) {
        let arr=[]
        res.data.data.forEach((val,index)=>{
          let json={}
          json.money = val.fee/100
          json.money2 = val.flower / 100
          json.id = val.id
          json.number = val.flower
          arr.push(json)
        })
        this.setData({
          chargeArr: arr
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