const util = require('../../utils/util');
const cart = require('../../utils/cart');
Page({
  data: {
    storageArr:[],
    allnum: 0,
    price: 0,
    productArr: [],
    showDialog:true,
    keyWords:'',
    keyWordsArr: [],
    hotWordsArr: []
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
  },
  choosebtn() {
    let num = this.data.cartHeight
    this.animation.bottom(num).step()
    this.setData({ animation: this.animation.export() })
  },
  choosebtn2() {
    let num = this.data.gwcHeight
    this.animation.bottom(-num).step()
    this.setData({ animation: this.animation.export() })
  },
  clearWords(){
    this.setData({
      keyWords: '',
    })
  },
  deleteBtn() {
    wx.setStorageSync('cartArr', {})
    this.data.productArr.forEach((val, index) => {
      val.num = 0
    })
    this.setData({
      storageArr: [],
      cartData: false,
      allnum: 0,
      price: 0,
      showCart: false,
      productArr: this.data.productArr
    })
  },
  showCart2() {
    let showCart = this.data.showCart
    if (this.data.allnum > 0) {
      showCart = !showCart
      this.setData({
        showCart: showCart
      })
    }
  },
  hideCart() {
    this.choosebtn2()
    this.setData({
      showCart: false
    })
  },
  gouwuche() {
    let json=cart.cunchu()
    this.setData({
      allnum: json.allnum
    })
  },
  resetItem(dataArrs, index, dataValue) {
    let jsons = {}
    let jsons3 = {}
    if (this.data.storageArr.length > 0) {
      jsons3 = wx.getStorageSync('cartArr')
    }
    if (dataArrs[index].num <= 0) {
      let ids = dataArrs[index].id
      delete jsons3[ids]
    } else {
      jsons = this.newCartArr(dataArrs, index)
    }
    let jsons4 = Object.assign(jsons3, jsons)
    try {
      wx.setStorageSync('cartArr', jsons4)
    } catch (e) {
      return false;
      // Do something when catch error
    }
    this.setData({
      [dataValue]: dataArrs
    })
  },
  newCartArr(dataArrs, index) {
    //格式化存到本地购物车的数据
    let jsons1 = {}
    jsons2=cart.jsonBox(dataArrs[index],true)
    jsons1[dataArrs[index].id] = jsons2
    return jsons1
  },
  increaseItem(e) {
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    this.resetItem(dataArrs, index, 'productArr')
    this.cunchu()
  },
  changeItem(e) {
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num + Number(e.currentTarget.dataset.num)
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.resetItem(dataArrs, index, 'productArr')
    this.cunchu()
  },
  cunchu() {
    let jsons = cart.cunchu()
    let arr5=[]
    this.data.productArr.forEach((val, index) => {
      jsons.storageArr.forEach((val2, index2) => {
        if (val2.id === val.id) {
          val.num = val2.num
        }
      })
      arr5.push(val)
    })
    this.setData({
      storageArr: jsons.storageArr,
      allnum: jsons.allnum,
      productArr: arr5
    })

  },
  clearAll(){
    let that=this
    wx.showModal({
      content: '是否清除搜索历史',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            keyWordsArr: [],
            keyWords: ''
          })
          wx.setStorageSync('keyWordsArr', [])
        }
      }
    })
    
  },
  changeKeyWords(e){
    this.setData({
      keyWords:e.detail.value
    })
  },
  async searchBtn(){
    if (this.data.keyWords){
      await this.keyWords(this.data.keyWords)
      this.cunchu()
      this.productList()
    } else {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
    }
    
  },
  showDialog2(){
    this.setData({
      showDialog: true
    })
  },
  keyWords(val){
    let arr = this.data.keyWordsArr
    arr.push(val)
    let arr2 = Array.from(new Set(arr))

    wx.setStorageSync('keyWordsArr', arr2)
    this.setData({
      keyWordsArr: arr2,
      keyWords: val,
      showDialog: false
    })
  },
  async chooseWords(e){
    await this.keyWords(e.currentTarget.dataset.words)
    this.productList()
    this.cunchu()
  },
  hotSearch() {
    util.request('/business/dictionary/getDictionaryListByCode', { code:'BUSINESS_HOT_SEARCH'}).then(res => {
      if (res.data.code == 0) {
        this.setData({
          hotWordsArr: res.data.data
        })
      }
    })
  },
  productList() {
    util.request('/business/product/getProductList', {
      current: 1,
      size: 12,
      categoryId: '',
      keyword:this.data.keyWords
      // current:this.data.index,
      // size: this.data.size
    }).then(res => {
      if (res.data.code == 0) {
        util.judgeData(res.data.data.records.length == 0,'noData',this)
        let arr = res.data.data.records.map(item => {
          item.num = 0
          return item
        })
        this.setData({
          productArr: arr
        })
        this.cunchu()
      }

    })
  },
  turnCart(){
    wx.switchTab({
      url: '/pages/myCart/myCart',
    })
  },
  onShow: function () {
    let arr2 = []
    let that = this
    wx.getStorage({
      key: 'keyWordsArr',
      success: function (res) {
        for (let i in res.data) {
          arr2.push(res.data[i])
          that.setData({
            keyWordsArr: arr2
          })
        };
      }
    })
    this.setData({
      keyWordsArr: arr2
    })
    this.cunchu()
    this.hotSearch()
  }
})