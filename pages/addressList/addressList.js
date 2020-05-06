const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    morenIndex:0,
    addressList:[],
    noData:false
  },
  addressList() {
    util.requests('/business/address/getAddressList', {}).then(res => {
      if (res.data.code == 0) {
        util.judgeData(res.data.data.length ==  0, 'noData', this)
        this.setData({
          addressList: res.data.data
        })
      }

    })
  },
  onShow: function () {
    this.addressList()
  }
})