const util = require('./util');

const login = () => {
  wx.login({
    success: res => {
      util.requests('/business/user/login', {
        code: res.code
      }, 'post', true).then(res => {
        try {
          wx.setStorageSync('token', res.data.data);
        } catch (e) {
          console.log('存储失败！')
        }
      }).catch(() => {});
    }
  });
}

const register = (encryptedData, iv, callback) => {
  wx.login({
    success: res => {
      let shareCode = wx.getStorageSync('shareCode');
      util.requests('/business/user/register', {
        code: res.code,
        encryptedData: encryptedData,
        iv: iv,
        shareCode: shareCode || null
      }, 'post').then(res => {
        try {
          wx.setStorageSync('token', res.data.data);
        } catch (e) {
          console.log('存储失败！')
        }
        callback && callback();
      });
    }
  });
}

const isLogin = () => wx.getStorageSync('token');

module.exports = {
  login: login,
  register: register,
  isLogin: isLogin
}
