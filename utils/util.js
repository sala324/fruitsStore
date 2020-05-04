const app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const cunchu = n =>{
  let jsons = {}
  try {
    jsons = wx.getStorageSync('cartArr')
  } catch (e) {
    return false;
  }
  if (jsons) {
    let arrs = []
    for (var p in jsons) {
      var json = jsons[p]
      json.id = Number(p)
      arrs.push(json)
    }
    let num = 0
    let price = 0
    let checkedAll= true
    arrs.forEach((val, index) => {

      if (val.checked) {
        num += val.num
        price += val.price * val.num
      } else {
        checkedAll= false
      }
    })
    let noData=false
    if (num > 0) {
      noData = false
      wx.setTabBarBadge({
        index: 1,
        text: num + ''
      })
    } else {
      noData =true
      wx.removeTabBarBadge({
        index: 1
      })
    }
    let json4={}
    json4.storageArr = arrs
    json4.cartData = true
    json4.allnum = num
    json4.price = price
    return json4
  }

}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
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
const errorimage=(arr, title, index)=> {
  const promise = new Promise(function (resolve, reject) {
    let that = this
    let titles = title
    let houseListTemp = arr;
    houseListTemp[index].images[0] = 'https://static.daxahome.com/miniwx/bigman/404.jpg';
    resolve(houseListTemp)
  })
  return promise
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
        reject(res);
      },
      complete: function () {

      }
    });
  });
}
module.exports = {
  formatTime: formatTime,
  request: request,
  requests: requests,
  getToken: getToken,
  login: login,
  err:err,
  toasts: toasts,
  toasts2: toasts2,
  errorimage: errorimage,
  cunchu: cunchu,
  dialog: dialog
}



