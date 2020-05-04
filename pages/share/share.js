const util = require('../../utils/util');
Page({
  data: {
    noData: false
  },
  commonList() {
    util.requests('/business/invite-award/getRecentList', {}).then(res => {
      this.setData({
        msgList: res.data.data
      })
      
    })
  },
  myList() {
    util.requests('/business/invite-award/getInviteeList', {}).then(res => {
      this.setData({
        myList: res.data.data
      })
      if (res.data.data){
        this.setData({
          noData:false
        })
      } else {
        this.setData({
          noData: true
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      shareCode: options.shareCode
    })
  },
  onReady: function () {

  },
  onShow: function () {
    this.commonList()
    this.myList()
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