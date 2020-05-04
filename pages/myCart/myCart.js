const util = require('../../utils/util');
const auth = require('../../utils/auth');
Page({
  data: {
    storageArr:[]
  },
  newCartArr(dataArrs,index){
    //格式化存到本地购物车的数据
    let jsons1 = {}
    let jsons2 = {}
    jsons2.num = dataArrs[index].num
    jsons2.title = dataArrs[index].title
    jsons2.price = dataArrs[index].price
    jsons2.checked = dataArrs[index].checked
    jsons2.thumbnails = dataArrs[index].thumbnails
    jsons2.originPrice = dataArrs[index].originPrice
    jsons1[dataArrs[index].id] = jsons2
    return jsons1
  },
  increaseItem1(dataArrs, index, dataValue) {
    let jsons = {}
    let jsons3 = wx.getStorageSync('cartArr')
    if (dataArrs[index].num <= 0) {
      let ids = dataArrs[index].id
      delete jsons3[ids]
    } else {
      jsons=this.newCartArr(dataArrs,index)
    }
    let jsons4 = Object.assign(jsons3, jsons)
    wx.setStorageSync('cartArr', jsons4)
    this.setData({
      [dataValue]: dataArrs
    })
  },
  async increaseItem2(e) {
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    await this.increaseItem1(dataArrs, index, 'storageArr')
    this.cunchu()
  },
  additem1(dataArrs, index, arrValue) {
    let jsons = {}
    let jsons3 = {}
    if (this.data.storageArr.length > 0) {
      jsons3 = wx.getStorageSync('cartArr')
    }
    jsons=this.newCartArr(dataArrs,index)
    let jsons4 = Object.assign(jsons3, jsons)
    try {
      wx.setStorageSync('cartArr', jsons4)
    } catch (e) {
      return false;
      // Do something when catch error
    }
    this.setData({
      [arrValue]: dataArrs
    })
  },
  additem2(e) {
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num + 1
    let index = e.currentTarget.dataset.index
    this.additem1(dataArrs, index, 'storageArr')
    this.cunchu()
  },
  toggleChecked(e){
    let arr=this.data.storageArr
    arr[e.currentTarget.dataset.index].checked = !arr[e.currentTarget.dataset.index].checked
    this.setData({
      checkedAll: true
    })
    arr.forEach((val,index)=>{
      if(val.checked==false){
        this.setData({
          checkedAll: false
        })
      }
    })
    this.setData({
      storageArr:arr
    })
    let jsons=wx.getStorageSync('cartArr')
    jsons[e.currentTarget.dataset.id].checked = !jsons[e.currentTarget.dataset.id].checked
    wx.setStorageSync('cartArr', jsons)
    this.cunchu()
  },
  cunchu() {
    let jsons =util.cunchu()
    this.setData({
      storageArr: jsons.storageArr,
      allnum:jsons.allnum,
      checkedAll:jsons.checkedAll,
      price:jsons.price
    })

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
        if (res.data.data) {
          this.setData({
            haveAddress: true
          })
        } else {
          this.setData({
            haveAddress: false
          })
        }
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
  useDada() {
    util.requests('/business/user/getCurrentUser', {}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          isLogin: true
        })
      } else {
        this.setData({
          isLogin: false
        })
      }

    })
  },
  checkAll() {
    this.setData({
      checkedAll: !this.data.checkedAll
    })
    if (this.data.checkedAll){
      this.data.storageArr.forEach((val,index)=>{
        val.checked=true
      })
    } else {
      this.data.storageArr.forEach((val, index) => {
        val.checked = false
      })
    }
    let json={}
    this.data.storageArr.forEach((val,index)=>{
      let jsons2={}
      jsons2.num = val.num
      jsons2.title = val.title
      jsons2.price = val.price
      jsons2.thumbnails = val.thumbnails
      jsons2.checked = val.checked
      jsons2.originPrice = val.originPrice
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
      this.useDada()
    }
    this.cunchu()
  },
  
})