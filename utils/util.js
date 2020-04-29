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
const isCompanyer = n => {
  let getCompanyer = '';
  try {
    getCompanyer = wx.getStorageSync('isCompanyer');
  } catch (e) {
    console.log('获取本地存储失败！')
  }
  return getCompanyer;
}
const userInfo = n => {
  let userInfos = '';
  try {
    userInfos = wx.getStorageSync('user');
  } catch (e) {
    console.log('获取本地存储失败！')
  }
  return userInfos;
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
const requests = (url, data, method) => {
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
          toasts(res.data.msg)
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
const setorderFormid = (formId) => {
  let apiHost = app.globalData.apiHost;
  if (formId=='the formId is a mock one'){

  } else {
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiHost + '/addFormId',
        data: {
          source: "member",
          formId: formId
        },
        method: 'post',
        success(res) {
          if (res.data.code == 0) {
            console.log('成功')
          } else {
            console.log('失败')
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
  
}
module.exports = {
  formatTime: formatTime,
  request: request,
  requests: requests,
  getToken: getToken,
  login: login,
  setorderFormid: setorderFormid,
  err:err,
  toasts: toasts,
  toasts2: toasts2,
  errorimage: errorimage,
  isCompanyer: isCompanyer,
  userInfo: userInfo,
  dialog: dialog
}



