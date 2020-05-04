const util = require('../../utils/util');
const auth = require('../../utils/auth');
const app = getApp();
Page({
  data: {
    isLogin: true,
    storageArr:[],//判断用户本地有无购物车数据
    id:0,
    price: 0,//购物车总价
    allnum: 0,//购物车总数
    showCart:false,
    index:1,
    size:10,
    productArr: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '来大侠管房，闲置房源秒出租，坐在家里当房东。',
      path: '/pages/index/index',
      success: function (res) {
        console.log(成功)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  setToken() {
    auth.login();
  },
  increaseItem1(dataArrs,index,dataValue){
    let jsons = {}
    let jsons2 = {}
    let jsons3 = wx.getStorageSync('cartArr')
    if (dataArrs[index].num <= 0) {
      let ids = dataArrs[index].id
      var index2 = this.data.productArr.findIndex((value, index, arr) => {
        return value.id == ids
      })
      if (index2>=0) {
        this.data.productArr[index2].num = 0
      }
      this.setData({
        productArr: this.data.productArr
      })
      delete jsons3[ids]
    } else {
      jsons2.num = dataArrs[index].num
      jsons2.title = dataArrs[index].title
      jsons2.price = dataArrs[index].price
      jsons2.checked = true
      jsons2.thumbnails = dataArrs[index].thumbnails
      jsons2.originPrice = dataArrs[index].originPrice
      jsons[dataArrs[index].id] = jsons2
    }
    let jsons4 = Object.assign(jsons3, jsons)
    wx.setStorageSync('cartArr', jsons4)
    this.setData({
      [dataValue]: dataArrs
    })
  },
  increaseItem(e){
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    this.increaseItem1(dataArrs, index, 'productArr')
    this.cunchu()
  },
  async increaseItem2(e) {
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    await this.increaseItem1(dataArrs, index, 'storageArr')
    this.cunchu()
  },
  additem1(dataArrs,index,arrValue){
    let jsons = {}
    let jsons2 = {}
    let jsons3 = {}
    if (this.data.storageArr.length > 0) {
      jsons3 = wx.getStorageSync('cartArr')
    }
    jsons2.num = dataArrs[index].num
    jsons2.title = dataArrs[index].title
    jsons2.price = dataArrs[index].price
    jsons2.checked = true
    jsons2.thumbnails = dataArrs[index].thumbnails
    jsons2.originPrice = dataArrs[index].originPrice/100
    jsons[dataArrs[index].id] = jsons2
    let jsons4 = Object.assign(jsons3, jsons)
    console.log(jsons4)
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
  additem2(e){
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num + 1
    let index = e.currentTarget.dataset.index
    this.additem1(dataArrs, index,'storageArr')
    this.cunchu()
  },
  addItem(e){
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num= dataArrs[e.currentTarget.dataset.index].num+1
    let index = e.currentTarget.dataset.index
    this.additem1(dataArrs, index,'productArr')
    this.cunchu()
  },
  showCart1() {
    this.setData({
      showCart: true
    })
    
  },
  deleteBtn1(){
    let that=this
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
  deleteBtn(){
    wx.setStorageSync('cartArr', {})
    this.data.productArr.forEach((val,index)=>{
      val.num=0
    })
    this.setData({
      storageArr:[],
      allnum:0,
      price:0,
      showCart:false,
      productArr: this.data.productArr
    })
    this.choosebtn2()
  },
  chooseType(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      index:1,
      productArr:[]
    })
    this.productList()
  },
  onLoad(options){
    if (options.shareCode){
      wx.setStorageSync('shareCode', options.shareCode)
      console.log(options.shareCode)
    }
  },
  cunchu(){
      let arr5 = []
      let json=util.cunchu()//拿出本地缓存的数据
      this.data.productArr.forEach((val, index) => {
        json.storageArr.forEach((val2, index2) => {
          if (val2.id === val.id) {//展示的当前商品列表跟购物车列表匹配
            val.num = val2.num
          }
        })
        arr5.push(val)
      })
      this.setData({
        storageArr: json.storageArr,
        productArr: arr5
      })
  },
  loadMore() {
    if (this.data.totalPage > this.data.index) {
      this.data.index++
      this.productList()
    }
  },
  productList() {
    util.request('/business/product/getProductList', { 
      categoryId:this.data.id,
      current:this.data.index,
      size: this.data.size
    }).then(res => {
      if (res.data.code == 0) {
        if (res.data.data.length > 0) {
          this.setData({
            noData: false
          })
        }
        res.data.data.records.forEach((val,index)=>{
          val.num=0
          val.originPrice=val.originPrice/100
          val.price = val.price/100
        })
        this.setData({
          productArr: this.data.productArr.concat(res.data.data.records),
          totalPage: res.data.data.pages,
        })
        this.cunchu()
      }

    })
  },
  tabOne() {
    util.request('/business/dictionary/getDictionaryListByCode', { code: 'BUSINESS_RECOMMEND_PRODUCT' }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          id:0
        })
        this.orderAgain(res.data.data)
      }
    })
  },
  orderAgain(arr) {
    util.requests('/business/product/getProductListByIdList', {
      productIdList: arr.join(',')
    }).then(res => {
      if (res.data.code == 0) {
        res.data.data.forEach((val, index) => {
          val.num = 0
          val.originPrice = val.originPrice / 100
          val.price = val.price / 100
        })
        this.setData({
          productArr: res.data.data
        })
        this.cunchu()
      }
    })
  },
  
  onShow: function () {
    this.setData({
      index:1,
      productArr:[]
    })
    this.productList()
    this.setToken()
    this.tabOne()
  }
})