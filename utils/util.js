const app = getApp();
const judgeData = (data,val,_this) =>{
  if(data){
    _this.setData({
      [val]:true
    })
  } else {
    _this.setData({
      [val]:false
    })
  }
}
const jisuanDate=(n,hours)=>{
  var day3 = new Date(n);
  day3.setTime(day3.getTime()+hours*60*60*1000);
  var s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate()+' '+n.substr(11,8);
  return s3
}
//获取token
const getToken = n => {
  let hearderToken = '';
  try {
    hearderToken = wx.getStorageSync('token');
  } catch (e) {
    console.log('获取本地存储失败！')
  }
  return hearderToken;
}
const dialog = n => {
  wx.showModal({
    title: n,
    content: '',
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  })
}
//去登陆
const login = () => {
  wx.navigateTo({
    url: '/pages/public/login/login',
  })
}
const resetDate = (n) => {
  let str = n.replace(/ 00:00:00/,'')
  return str
}
//错误处理
const err = (title) => {
  wx.showModal({
    title: title,
    showCancel: false
  });
}
const toasts = (title,time=2000) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: time
  })
}
const toasts2 = (title, time = 2000) => {
  wx.showToast({
    title: title,
    duration: time
  })
}
const request = (url, data, method)=>{
  wx.showLoading({
    title: '加载中',
  })
  let token = getToken();
  let apiHost = app.globalData.apiHost;
  // let apiHost = 'https://api.dxiahome.com/api';
  method = method||'GET';
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.apiHost+url,
      data: data,
      method: method,
      header: {
        'X-Token': token // 默认值
      },
      success(res){
        resolve(res)
        wx.hideLoading();
      },
      fail(res){
        reject(res);
      },
      complete: function () {
        
      }
    });
  });
}
const requests = (url, data, method, hideToast) => {
  let hearderToken = getToken();
  let apiHost = app.globalData.apiHost;
  method = method || 'GET';
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.apiHost + url,
      data: data,
      method: method,
      header: {
        'X-Token': hearderToken // 默认值
      },
      success(res) {
        if(res.data.code==0){
          resolve(res)
        } else {
          !hideToast && toasts(res.data.msg)
        }
        
      },
      fail(res) {
        toasts('网络超时请稍后再试')
      },
      complete: function () {

      }
    });
  });
}
module.exports = {
  request: request,
  requests: requests,
  getToken: getToken,
  login: login,
  judgeData:judgeData,
  err:err,
  toasts: toasts,
  toasts2: toasts2,
  dialog: dialog,
  resetDate: resetDate,
  jisuanDate:jisuanDate
}



