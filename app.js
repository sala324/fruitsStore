App({
  globalData: {
    apiHost: 'https://caojiantao.site:8080/',//正式服
    urlHost: 'http://static.daxahome.com',//正式服
    pdfHost: 'https://static.daxahome.com',//正式服
    otherHost: 'https://other.daxahome.com',//正式服
    // apiHost: 'https://api.dxiahome.com/api',//测试服
    // urlHost: 'http://static.dxiahome.com',//测试服
    // pdfHost: 'https://static.dxiahome.com',//测试服
    // otherHost: 'https://other.dxiahome.com',//测试服
    pointArr:[],
    pointImg:[],
    navHeight:0
  },
  onLaunch: function (options) {
    let me = this;
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    wx.getSystemInfo({
      success: res => {
      //导航高度
      
      this.globalData.navHeight = res.statusBarHeight+46;
      }
     })
    updateManager.onUpdateReady(function () {
      wx.showModal({ 
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
    
  },
})