const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    morenIndex:0,
    addressList:[]
  },
  addressList() {
    util.requests('/business/address/getAddressList', {}).then(res => {
      if (res.data.code == 0) {
        
        this.setData({
          chargeArr: arr
        })
      }

    })
  },
  onShow: function () {
    let arr2 = []
    let that = this
    wx.getStorage({
      key: 'addressList',
      success: function (res) {
        for (let i in res.data) {
          arr2.push(res.data[i])
          that.setData({
            addressList: arr2
          })
        };
      }
    })
    this.setData({
      addressList: arr2
    })
    this.addressList()
  }
})