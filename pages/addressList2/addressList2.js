const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    morenIndex:0,
    addressList:[]
  },
  chooseAddress(e){
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({
      address: e.currentTarget.dataset.address,
      linkMan: e.currentTarget.dataset.linkMan,
      mobile: e.currentTarget.dataset.mobile,
    });
    wx.navigateBack({
      delta: 1,
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
    console.log(arr2)
  }
})