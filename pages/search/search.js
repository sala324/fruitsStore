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
  changeItem(e) {
    let dataArrs = this.data.productArr
    dataArrs[e.detail.index].num = e.detail.num
    cart.resetItem(dataArrs, this.data.storageArr,e.detail.index, 'productArr',this)
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
      util.toasts('请输入商品名称')
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