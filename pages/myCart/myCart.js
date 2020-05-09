const util = require('../../utils/util');
const auth = require('../../utils/auth');
const cart = require('../../utils/cart');
Page({
  data: {
    storageArr:[]
  },
  async changeItem(e){
    let dataArrs = this.data.storageArr
    dataArrs[e.detail.index].num = e.detail.num
    await cart.resetItem(dataArrs, dataArrs,e.detail.index, 'storageArr',this)
    this.cunchu()
  },
  toggleChecked(e){
    let arr=this.data.storageArr
    arr[e.currentTarget.dataset.index].checked = !arr[e.currentTarget.dataset.index].checked
    let checkedAll=arr.every(item=>{
      return item.checked==true
    })
    this.setData({
      checkedAll: checkedAll,
      storageArr:arr
    })
    let jsons=wx.getStorageSync('cartArr')
    jsons[e.currentTarget.dataset.id].checked = !jsons[e.currentTarget.dataset.id].checked
    wx.setStorageSync('cartArr', jsons)
    this.cunchu()
  },
  cunchu() {
    let jsons =cart.cunchu()
    if (jsons){
      this.setData({
        storageArr: jsons.storageArr,
        allnum: jsons.allnum,
        checkedAll: jsons.checkedAll,
        price: jsons.price
      })
    } else {
      this.setData({
        noData:true
      })
    }
  },
  deleteBtn() {
    wx.setStorageSync('cartArr', {})
    this.setData({
      storageArr: [],
      cartData: false,
      allnum: 0,
      price: 0,
      noData:true
    })
    wx.removeTabBarBadge({
      index: 1
    })
  },
  deleteBtn1() {
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '清空购物车中所有商品？',
      success: function (res) {
        if (res.confirm) {
          that.deleteBtn()
        }
      }
    })
  },
  defaultAddress() {
    util.requests('/business/address/getDefaultAddress', {}).then(res => {
      if (res.data.code == 0) {
        util.judgeData(res.data.data,'haveAddress',this)
      }
    })
  },
  jisuan() {
    if (this.data.haveAddress && this.data.isLogin) {
      wx.navigateTo({
        url: "/pages/setOrder/setOrder"
      })
    } else if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else if (!this.data.haveAddress) {
      wx.showModal({
        title: '',
        content: '您还没默认收货地址，请在"我的—收货地址"里新增收货地址',
        showCancel: false
      })
    }
  },
  checkAll() {
    this.setData({
      checkedAll: !this.data.checkedAll
    })
    let json={}
    this.data.storageArr.forEach((val,index)=>{
      let jsons2=cart.jsonBox(val,this.data.checkedAll)
      json[val.id] = jsons2
    })
    wx.setStorageSync('cartArr', json)
    this.setData({
      storageArr: this.data.storageArr
    })
    this.cunchu()
  },
  onShow: function () {
    if (auth.isLogin()) {
      this.defaultAddress()
      util.judgeData(auth.isLogin(),'isLogin',this)
    }
    this.cunchu()
  },
  
})