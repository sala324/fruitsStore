const util = require('../../utils/util');
const auth = require('../../utils/auth');
const cart = require('../../utils/cart');
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
    text:123
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '来郭鲜生。美味生鲜任您挑',
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
  changeItem(e){
    let dataArrs = this.data.productArr
    dataArrs[e.detail.index].num = e.detail.num
    cart.resetItem(dataArrs, this.data.storageArr,e.detail.index, 'productArr',this)
    this.cunchu()
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
    }
  },
  cunchu(){
      let arr = []
      let json=cart.cunchu()//拿出本地缓存的数据
      if (json){
        this.data.productArr.forEach((val, index) => {
          json.storageArr.forEach((val2, index2) => {
            if (val2.id === val.id) {//展示的当前商品列表跟购物车列表匹配
              val.num = val2.num
            }
          })
          arr.push(val)
        })
        this.setData({
          storageArr: json.storageArr,
          productArr: arr
        })
      }
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
          val.originPrice=val.originPrice
          val.price = val.price
        })
        this.setData({
          productArr: this.data.productArr.concat(res.data.data.records),
          totalPage: res.data.data.pages,
        })
        this.cunchu()
      }
    })
  },
  test2(){
    return new Promise(resolve=>{
      setTimeout(()=>{
        console.log('异步函数2')
        resolve('test2')
      },3000)
    })
  },
  tabOne() {
  return util.request('/business/dictionary/getDictionaryListByCode', { code: 'BUSINESS_RECOMMEND_PRODUCT' }).then(res => {
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
        })
        this.setData({
          productArr: res.data.data
        })
        this.cunchu()
        console.log(456+'测试pdd分支')
      }
    })
  }, 
  onShow: function () {
    this.setData({
      index:1,
      productArr:[]
    })
    this.setToken()
    this.tabOne()
  }
})