const util = require('../../utils/util');
Page({
  data: {
    userData:{}
  },
  useDada(){
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          userData: res.data.data
        })
      }
      
    })
  },
  onShow: function () {
    this.useDada()
  }
})