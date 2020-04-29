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
        if (res.data.data.length > 0) {
          this.setData({
            noData: false
          })
        }
        this.setData({
          addressList: res.data.data
        })
      }

    })
  },
  onShow: function () {
    this.addressList()
    console.log(this.data.id)
  },
  chooseAddress(e){
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({
      address: e.currentTarget.dataset.building + ' ' + e.currentTarget.dataset.detail,
      linkMan: e.currentTarget.dataset.deliveryName,
      mobile: e.currentTarget.dataset.contactNumber,
      id: e.currentTarget.dataset.id
    });
    wx.navigateBack({
      delta: 1,
    })
  }
})