const app = getApp();
const cunchu = n =>{
  let jsons = {}//购物车本地缓存
  try {
    jsons = wx.getStorageSync('cartArr')
  } catch (e) {
    return false;
  }
  delete jsons['nv_toString']//删除从wx.getStorageSync中拿到的nv_toString
  let num = 0,//购物车总数量
      price = 0//购物车总价
      checkedAll= false//购物车全选
      arrs = []//购物车列表
      youhui= 0//购物车优惠金额
  if (jsons) {
    for (var p in jsons) {
      var json = jsons[p]
      json.id = Number(p)
      arrs.push(json)
    }
    checkedAll= true
    arrs.forEach((val, index) => {
      if (val.checked) {
        num += val.num
        price += val.price * val.num
        if (val.originPrice > val.price) {
          youhui += (val.originPrice - val.price) * val.num
        }
      } else {
        checkedAll= false
      }
    })
    let noData=false//购物车有无数据
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
  }
  let json4={}
  json4.storageArr = arrs
  json4.cartData = true
  json4.allnum = num
  json4.youhui = youhui
  json4.checkedAll = checkedAll
  json4.price = price/100
  return json4

}
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
const jsonBox = (val,booler=val.checked) =>{
  let jsons2={}
  jsons2.num = val.num
  jsons2.title = val.title
  jsons2.price = val.price
  jsons2.thumbnails = val.thumbnails
  jsons2.checked = booler
  jsons2.originPrice = val.originPrice
  return jsons2
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
  jsonBox:jsonBox,
  request: request,
  requests: requests,
  getToken: getToken,
  login: login,
  judgeData:judgeData,
  err:err,
  toasts: toasts,
  toasts2: toasts2,
  cunchu: cunchu,
  dialog: dialog
}



